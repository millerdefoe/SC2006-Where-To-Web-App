import requests
import json
import os 
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

class MRTController():

    def __init__():

        return True

    def getMRTStationNumber(stationname): 
        queryStatement = f"""
            SELECT stationnumber 
            FROM mrtstationinfo 
            WHERE stationname = '{stationname}';
        """
        logger.debug("Running query string to get station number from station name")
        data = dbObj.readData(queryStatement)[0][0]
        return data

    def getMRTCongestionLevel(stationnumber):
        queryStatement = f"""
            SELECT mrtcongestionlevel 
            FROM mrtcongestionlevel 
            WHERE stationnumber = '{stationnumber}';
        """
        logger.debug("Running query string to get mrt congestion levels from station number")
        data = dbObj.readData(queryStatement)
        return data
    
    