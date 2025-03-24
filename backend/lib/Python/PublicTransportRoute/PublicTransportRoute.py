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

class PublicTransportRoute():
    
    #For initialising objects (Eg. Created PTR object = PublicTransportRoute, runs whatever is declared in this field)
    def __init__(): 
        return True
    
    def getCurrentLocation():
        return True
    
    def getDestinationLocation():
        return True
    
    def getRouteType():
        return True
    
    def getDate():
        return True
    
    def getTime():
        return True
    
    def getMode():
        return True
    
    def getMaximumWalkingDistance():
        return True
    
    def setCurrentLocation(currentLocation):
        return True
    
    def setDestinationLocation(destinationLocation):
        return True
    
    def setRouteType(routeType):
        return True
    
    def setDate(date):
        return True
    
    def setTime(time):
        return True
    
    def setMode(mode):
        return True
    
    def setMaximumWalkingDistance(maximumWalkingDistance):
        return True
    
    def computeLeastCongestedRoute():
        return True
    
    def setLeastCongestedRoute(computeLeastCongestedRoute):
        return True
    
    def computeFastestRoute():
        return True
    
    def setFastesRoute(computeFastestRoute):
        return True