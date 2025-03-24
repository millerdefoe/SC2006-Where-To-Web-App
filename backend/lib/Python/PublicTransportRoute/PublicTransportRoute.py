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

#One object per route
class PublicTransportRoute():

    def __init__(self, currentLocation: Location, destinationLocation, routeType, date, time, mode, maximumWalkingDistance):

        self.currentLocation = currentLocation
        self.destinationLocation = destinationLocation
        self.routeType = routeType
        self.date = date
        self.time = time
        self.mode = mode
        self.maximumWalkingDistance = maximumWalkingDistance
        return True
    
    def calculateDesiredRoute():
        return True
    
    def setDesiredRoute(calculateDesiredRoute):
        return True

