import uvicorn
from main import app

uvicorn.run(port=8000, app=app)
