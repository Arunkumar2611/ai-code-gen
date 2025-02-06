import openai

openai.api_key = ""

# Function to extract intent from user prompt
def extract_intent(prompt: str):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": f"Extract intent from: {prompt}"}]
    )
    return response["choices"][0]["message"]["content"]

# Function to generate a dynamic setup script based on the intent
def generate_script(intent: str, project_name: str):
    script = "#!/bin/bash\n\n"

    if "react" in intent.lower():
        script += f"npx create-react-app {project_name}\n"

    if "vite" in intent.lower():
        script += f"npm create vite@latest {project_name} -- --template react-ts\n"

    if "nodejs" in intent.lower():
        script += f"mkdir {project_name} && cd {project_name} && npm init -y\n"

    if "flask" in intent.lower():
        script += f"mkdir {project_name} && cd {project_name} && python -m venv venv && source venv/bin/activate\n"
        script += "pip install flask\n"

    if "django" in intent.lower():
        script += f"django-admin startproject {project_name}\n"

    return script