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

class Settings():

    def __init__():

        return True

    def getCarparkPricingLimit():

        return True

    def getMaximumWalkingDistance(): 

        return True

    def getGPSStatus():

        return True

    def setCarparkPricingLimit(carparkPricingLimit):

        return True

    def setMaximumWalkingDistance(maximumWalkingDistance):

        return True

    def setGPSStatus(gpsStatus):

        return True