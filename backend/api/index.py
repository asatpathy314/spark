from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient


# Create a new client and connect to the server
client = MongoClient("mongodb+srv://admin:hoohacks2024@spark.qal3ew8.mongodb.net/")
db = client["users"]
collection = db["person"]

    
app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


class User(BaseModel):
    name: str
    college: str
    profile: str

class Mentor(BaseModel):
    name: str
    college: str
    profile: str



@app.get("/")
def index():
    return {"Welcome": "to Spark!"}


@app.get("/name/") #FINISH



@app.get("/getStudent/")
def getStudent():
    return collection.find()



@app.post("/registerStudent/{student_email}")
async def registerStudent(student_email: str, user: User, request: Request):
    student = {}
    student[student_email] = user

    collection.insert_one(student)

    document = collection.find(student)

    if document:
        return {"Status": request.status_code}
    else:
        raise HTTPException(status_code=404)

@app.post("/registerMentor/{mentor_email}")
async def registerMentor(mentor_email: str, mentor: Mentor, request: Request):
    mentor = {mentor_email: mentor}
    collection.insert_one(mentor)

    document = collection.find(mentor)

    if document != None:
        return request.status_code
    else:
        raise HTTPException(status_code=404)
    
@app.delete("/deleteStudent/{student_email}")
async def deleteUser(student_id: str, user: User):
    student = {student_id: user}

    collection.delete_one(student)

    if collection.find_one(student) == None:
        return {"Success": "entry was deleted"}
    
    else:
        return {"Error": "entry could not be deleted"}
    
    

@app.delete("/deleteMentor/{mentor_email}")
async def deleteUser(mentor_id: str, mentor: Mentor):
    mentor = {mentor_id: Mentor}
    
    collection.delete_one(mentor)
    
    if collection.find_one(mentor) == None:
        return {"Success": "entry was deleted"}
    
    else:
        return {"Error": "entry could not be deleted"}


if __name__ == "__main__":
    app.run(debug=True)