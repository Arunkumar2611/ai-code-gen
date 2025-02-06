from fastapi import FastAPI
from pydantic import BaseModel
from script_gen import extract_intent, generate_script
from execute_script import execute_script, load_projects
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("starting the server")
class ProjectRequest(BaseModel):
    prompt: str
    project_name: str


@app.post("/generate-project/")
async def generate_project(data: ProjectRequest):
    intent = extract_intent(data.prompt)
    script = generate_script(intent, data.project_name)
    stdout, stderr = execute_script(script, data.project_name)
    return {"script": script, "output": stdout, "error": stderr}


class PackageRequest(BaseModel):
    project_name: str
    packages: str


@app.post("/install-packages/")
async def install_packages(data: PackageRequest):
    projects = load_projects()
    if data.project_name not in projects:
        return {"error": "Project not found"}

    project_path = projects[data.project_name]
    package_command = f"npm install {data.packages}" if os.path.exists(
        os.path.join(project_path, "package.json")) else f"pip install {data.packages}"

    result = subprocess.run(package_command, cwd=project_path, shell=True, capture_output=True, text=True)

    return {"output": result.stdout, "error": result.stderr}

