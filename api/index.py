# api/index.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS configuration to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    # Make sure to use the correct frontend URL without a trailing slash
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI, FastAPI is a modern, fast (high-performance), web framework for building APIs with Python based on standard Python type hints."}


@app.get("/data")
def get_data():
    return {"numbers": [1, 2, 3, 4, 5, 6]}
