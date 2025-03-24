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

class Bus():

    def __init__():

        return True

    def getBusStopCode():

        return True

    def getBusServiceNumber(): 

        return True
    
    def getBusArrivalTime():

        return True

    def getBusCongestionLevel():

        return True

    def setBusStopCode(busStopCode):

        return True

    def setBusServiceNumber(busServiceNumber):

        return True
    
    def setBusArrivalTime(busArrivalTime):

        return True
    
    def setBusCongestionLevel(busCongestionLevel):

        return True
