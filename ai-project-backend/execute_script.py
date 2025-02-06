import subprocess
import os
import json

PROJECTS_FILE = "projects.json"

def save_project(name, path):
    """Save project metadata to track project directories."""
    projects = load_projects()
    projects[name] = path
    with open(PROJECTS_FILE, "w") as f:
        json.dump(projects, f)

def load_projects():
    """Load project metadata from file."""
    if os.path.exists(PROJECTS_FILE):
        with open(PROJECTS_FILE, "r") as f:
            return json.load(f)
    return {}

def execute_script(script: str, project_name: str):
    """Execute the script inside the backend."""
    project_path = f"./generated_projects/{project_name}"
    os.makedirs(project_path, exist_ok=True)

    # Save script to file
    script_file = os.path.join(project_path, "setup.sh")
    with open(script_file, "w") as f:
        f.write(script)

    # Make script executable and run
    subprocess.run(["chmod", "+x", script_file])
    result = subprocess.run(["/bin/bash", script_file], cwd=project_path, capture_output=True, text=True)

    # Save project path
    save_project(project_name, project_path)

    return result.stdout, result.stderr
