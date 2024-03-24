from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from typing import *
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
    emailAddress: str
    college: str
    profile: str
    entities: List[str]
    name: str
    isMentor: bool
    password: str
    link: str
    


def getStudentByEmail(email: str):
    for emails in collection.find({}):
        if email == emails.get("emailAddress"):
            return {
                    "emailAddress": email,
                    "college": emails.get("college"),
                    "profile": emails.get("profile"),
                    "entities": emails.get("entities"),
                    "name": emails.get("name"),
                    "isMentor": emails.get("isMentor"),
                    "password": emails.get("password"),
                    "link": emails.get("link")
                }

    return None


@app.get("/")
def index():
    return {"Welcome": "to Spark!"}


@app.get("/getPerson/{email}")
async def getStudent(email: str):
    return getStudentByEmail(email)


@app.post("/register/{email}")
async def register(person: Person):
    registration = {
        "emailAddress": person.emailAddress,
        "college": None,
        "profile": None,
        "entities": None,
        "name": None,
        "isMentor": person.isMentor,
        "password": person.password,
        "link": person.link
    }

    collection.insert_one(registration)

    if collection.find_one({"emailAddress": person.emailAddress}):
        return {"status": "entry added"}
    
    return {"status": "not added"}


@app.put("/updateProfile/{email}")
async def updatedProfile(email: str, person: Person):
    if getStudentByEmail(email) != None:
 
        userData = {
            "emailAddress": person.emailAddress,
            "colleges": person.college,
            "profile": person.profile,
            "entities": person.entities,
            "name": person.name,
            "isMentor": person.isMentor,
            "password": person.password,
            "link": person.link
        }

        for emails in collection.find({}):
            if email == emails.get("emailAddress"):
                collection.update_one({"email": email}, {"$set" : {**userData}})
                return {"Status": "Profile was Updated"}
            
        
        return {"Status": "Profile was not Updated"}


@app.get("/matchUsers")
async def matchUsers():
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