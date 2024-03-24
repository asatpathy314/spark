from fastapi import FastAPI, Request, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from fastapi.encoders import jsonable_encoder
from typing import List
import spacy


# Create a new client and connect to the server
client = MongoClient("mongodb+srv://admin:hoohacks2024@spark.qal3ew8.mongodb.net/")
db = client["users"]
collection = db["person"]

    
app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

class Person(BaseModel):
    name: str
    colleges: str
    profile: List[str]
    isMentor: bool
    emailAddress: str
    hashedPassword: str


@app.get("/")
def index():
    return {"Welcome": "to Spark!"}


@app.get("/getPerson/{email}")
def getStudent(email: str):
    for emails in collection.find({}):
        if email == emails.get("emailAddress"):
            return {
                    "name": emails.get("name"),
                    "colleges": emails.get("colleges"),
                    "profile": emails.get("profile"),
                    "isMentor": emails.get("isMentor"),
                    "emailAddress": emails.get("emailAddress"),
                    "hashedPassword": emails.get("hashedPassword")
                }

    return {"Entry" : "Not Found"}

@app.post("/register/{email}")
async def register(email: str, person: Person):
    registration = {
        "name": None,
        "colleges": None,
        "profile": None,
        "isMentor": person.isMentor,
        "emailAddress": email,
        "hashedPassword": person.hashedPassword
    }

    collection.insert_one(registration)

    if collection.find({"email": email}) != None:
        return {"Success": "entry added"}
    
    return {"Error": "not added"}

@app.get("/matchUsers")
def matchUsers():
    #First get All of the Profiles anc check if is a mentor then iterate through and grab perform the union and append each len 
    #of the union in a list and then
    #sort it by decesending order
    nlp = spacy.load("en_core_web_sm")
    matches = []
    topMatches = []

    #students = [nlp(elem) for elem in collection.find({}, {"profile": 1})]
    mentors = [nlp(elem) for elem in collection.find({}, {"profile": 1}) if elem.get("isMentor")]

    for ent in mentors.ents:
        lengths = len(set(mentors.ents).union(set(ent)))
        matches.append((mentors.text, ent.text), lengths)

    matches = sorted(matchUsers, reverse=True)

    for i in range(0, 3):
        topMatches.append(matches[i])

    return topMatches



        




if __name__ == "__main__":
    app.run(debug=True)