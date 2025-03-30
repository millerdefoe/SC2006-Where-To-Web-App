import requests
import json
import os

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Database.Database import Database
from lib.Python.Helper.HelperFunctions import loadDatabaseCredentials

logger = PythonLogger(os.path.basename(__file__))

databaseCreds = loadDatabaseCredentials(r"./creds/priv/database.json")

dbObj = Database(
    databaseCreds["host"],
    databaseCreds["database"],
    databaseCreds["username"],
    databaseCreds["password"],
    databaseCreds["port"]
)

class Location(): 
    def __init__(self, latitude, longitude):

        self.latitude = latitude
        self.longitude = longitude
        
        return

    def getLantitude(self):
        return self.latitude
    
    def getLongitude(self):
        return self.longitude
    
    def setLocation(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude
