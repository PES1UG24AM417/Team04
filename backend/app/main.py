
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth

app = FastAPI(
    title="StreamHub API",
    description="Backend API for the StreamHub streaming platform",
    version="1.0.0",
)

# Allow the React + Vite frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register authentication routes
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "StreamHub API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
