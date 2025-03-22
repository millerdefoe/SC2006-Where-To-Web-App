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

class Carpark():

    def __init__():

        return True

    def getCarparkName(carparkId):

        return True

    def getCarparkID(carparkName):

        return True

    def getAvailableLots(carparkId):

        return True

    def getCarparkRate(carparkId):

        return True

    def updateCarparkRate(carparkId, rate):

        return True

    def updateAvailableLots(carparkId, lots):

        return True

    def updateCarparkName(carparkId, carparkName):

        return True