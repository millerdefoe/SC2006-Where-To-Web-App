import requests
import json
import os 
import time
import datetime
import subprocess
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
        data = dbObj.readData(queryStatement)[0][0]
        return data
    
    def getMRTCongestionTimestamp(): #Gets the endtime from the mrt congestion level table. Used to compare if it is updated. Called from updateCongestionDatabase.
        queryStatement = f"""
        SELECT endtime  
        FROM mrtcongestionlevel
        LIMIT 1;
        """
        logger.debug("Running query string to get timestamp from MRT Congestion table")
        timestamp = dbObj.readData(queryStatement)[0][0]
        return timestamp
    
    def updateCongestionDatabase():
        timestamp = MRTController.getMRTCongestionTimestamp()
        unix_timestamp = int(time.mktime(timestamp.timetuple())) #Converts it to unix
        if time.time() - 10 * 60 > unix_timestamp: # Update database if the table timestamp is older than 10 mins
            subprocess.Popen(["python", ".\scripts\MRTCrowdDensityFetcher.py", "-d"])
