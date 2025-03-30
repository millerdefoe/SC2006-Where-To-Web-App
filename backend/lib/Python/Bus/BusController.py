import requests
import json
import os

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Database.Database import Database
from lib.Python.Helper.HelperFunctions import loadDatabaseCredentials
from lib.Python.Helper.HelperFunctions import getPCDAPIKey

logger = PythonLogger(os.path.basename(__file__))

databaseCredsPath = os.path.join(".", "creds", "priv", "database.json")
pcdKeyPath = os.path.join(".", "creds", "priv", "lta.json")
databaseCreds = loadDatabaseCredentials(databaseCredsPath)
pcdKey = getPCDAPIKey(pcdKeyPath)

dbObj = Database(
    databaseCreds["host"],
    databaseCreds["database"],
    databaseCreds["username"],
    databaseCreds["password"],
    databaseCreds["port"]
)

class BusController:

    def __init__(self):
        return None

    def getBusStopCode(self, arrivalBusStopName):
        queryStatement = f"""
            SELECT busstopcode 
            FROM busstops 
            WHERE landmarkdescription = '{arrivalBusStopName}';
        """
        logger.debug("Running query string to get bus stop code")
        data = dbObj.readData(queryStatement)
        return data

    def getBusCongestionLevel(self, arrivalBusStopCode, arrivalBusServiceNumber):
        url = f'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode={arrivalBusStopCode}&ServiceNo={arrivalBusServiceNumber}'

        headers = {
            'AccountKey': pcdKey,
            'Accept': 'application/json',
        }

        response = requests.get(url, headers=headers)
        responseData = response.json()

        services = responseData['Services']
        print(responseData)

        if services != []: 
            #Extracts the bus load only. NextBus just refers to the current one that is arriving
            print(services[0]['NextBus']['Load'])
            return services[0]['NextBus']['Load']
        else:
            return None