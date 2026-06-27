from fastapi import FastAPI
from routers import company
from routers import job
from database import Base,engine
from models import company as company_model,job as job_model

app = FastAPI()
print("Engine is : ",engine)
Base.metadata.create_all(bind=engine)
app.include_router(company.router)
app.include_router(job.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/about")
def read_about():
    return {"About": "This is a FastAPI application."}

@app.get("/contact")
def read_contact():
    return {"contact": "Mob:1234567891,email: example@example.com"}