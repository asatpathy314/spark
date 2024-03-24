from fastapi import FastAPI
import logging
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from typing import *
import spacy


# Create a new client and connect to the server
logging.basicConfig(level=logging.INFO)
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
    
class UpdatePerson(BaseModel):
    emailAddress: Optional[str] = None
    college: Optional[str]
    profile: Optional[str]
    name: Optional[str]
    link: Optional[str]


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
def update_student(email: str, person: UpdatePerson):

    update_operations = {}

    if person.name is not None:
        update_operations["name"] = person.name

    if person.profile is not None:
        update_operations["profile"] = person.profile

    if person.emailAddress is not None:
        update_operations["emailAddress"] = person.emailAddress

    if person.college is not None:
        update_operations["college"] = person.college

    if person.link is not None:
        update_operations["link"] = person.link

    if update_operations:
        collection.update_one(
            {"emailAddress": email},
            {"$set": update_operations},
        )
        return {"message": "entry was successfully updated"}
    else:
        return {"message": "No valid fields to update"}


@app.get("/getMatches/{email}")
def get_matches(email: str):
    #return three json objects with name, email, link, college
    nlp = spacy.load('en_core_web_sm')
    entries = []
      # Retrieve document from MongoDB based on email
    for idx, emails in enumerate(collection.find({})):
        if emails.get("name"):
            if idx==0:
                entries.append({ "one":
                        {"name": emails.get("name"),
                        "emailAddress": email,
                        "college": emails.get("college"),
                        "link": emails.get("link")}
                    })
            elif idx==1:
                    entries.append({ "two": {
                        "name": emails.get("name"),
                        "emailAddress": email,
                        "college": emails.get("college"),
                        "link": emails.get("link")}
                    })
            elif idx==2:
                    entries.append({ "three": {
                        "name": emails.get("name"),
                        "emailAddress": email,
                        "college": emails.get("college"),
                        "link": emails.get("link")}
                })
    return entries




    """
    FUTURE WORK
    person_profile_cursor = collection.find_one({"emailAddress": email})

    if person_profile_cursor:
        text = person_profile_cursor.get("profile", "")
        doc = nlp(text)
        entities = set(doc.ents)
        
    """

if __name__ == "__main__":
    app.run()