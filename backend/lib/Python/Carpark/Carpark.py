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

    def getCarparkName():

        return True

    def getAvailableLots():

        return True

    def getCarparkRate():

        return True

    def setCarparkRate(rate):

        return True

    def setAvailableLots(lots):

        return True

    def setCarparkName(carparkName):

        return True