import requests
import json

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Database.Database import Database
from lib.Python.Helper.HelperFunctions import loadDatabaseCredentials

logger = PythonLogger(os.path.basename(__file__))

databaseCreds = loadDatabaseCredentials(r".\creds\priv\database.json")

dbObj = Database(
    databaseCreds["host"],
    databaseCreds["database"],
    databaseCreds["username"],
    databaseCreds["password"],
    databaseCreds["port"]
)

class Location(): 
    def __init__():
        return True

    def getLangitude():
        return True
    
    def getLongitude():
        return True
    
    def setLangitude(langitude):
        return True
    
    def setLongitude(longitude):
        return True