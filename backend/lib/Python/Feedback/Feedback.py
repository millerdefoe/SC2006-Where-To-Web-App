import requests
import json

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Database.Database import Database
from lib.Python.Helper.HelperFunctions import loadDatabaseCredentials

logger = PythonLogger(os.path.basename(__file__))

databaseCredsPath = os.path.join(".", "creds", "priv", "database.json")
databaseCreds = loadDatabaseCredentials(databaseCredsPath)

dbObj = Database(
    databaseCreds["host"],
    databaseCreds["database"],
    databaseCreds["username"],
    databaseCreds["password"],
    databaseCreds["port"]
)

class Feedback():

    def __init__():

        return True

    def getFeedbackID():

        return True

    def getFeedbackMessage(): 

        return True

    def getCreatedAt():

        return True
    
    def getUpdatedAt():

        return True

    def setFeedbackID(feedbackID):

        return True

    def setFeedbackMessage(feedbackMessage):

        return True

    def setCreatedAt(createdAt):

        return True
    
    def setUpdatedAt(updatedAt):

        return True