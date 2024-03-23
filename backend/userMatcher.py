import spacy

def calculateMatchScore(studentText, mentorText) -> int: 
    if studentText == None or mentorText == None:
        return 0
    
    else:
        #Utilizes spacy model
        nlp = spacy.load("en_core_web_lg")

        #converts it into nlp Doc representation
        doc = nlp(studentText)
        doc2 = nlp(mentorText)

        return doc.similarity(doc2)
    




