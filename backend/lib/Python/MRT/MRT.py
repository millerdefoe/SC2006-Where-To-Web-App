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

class MRT():

    def __init__():

        return True

    def getMRTName():

        return True

    def getMRTStationNumber(): 

        return True

    def getMRTCongestionLevel():

        return True

    def setMRTName(mrtName):

        return True

    def setMRTStationNumber(mrtStationNumber):

        return True

    def setMRTCongestionLevel(mrtCongestionLevel):

        return True