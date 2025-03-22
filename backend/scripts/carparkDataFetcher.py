import requests
import os
import argparse
import time
from datetime import datetime

from lib.Python.Database.Database import Database
from lib.Python.Helper.HelperFunctions import loadDatabaseCredentials
from lib.Python.Helper.HelperFunctions import getLtaAPIKey
from lib.Python.Logging.PythonLogger import PythonLogger

logger = PythonLogger(os.path.basename(__file__), fileName=r".\logs\carparkdatafetcher.logs")

databaseCreds = loadDatabaseCredentials(r".\creds\priv\database.json")
ltaKey = getLtaAPIKey(r".\creds\priv\lta.json")

dbObj = Database(
    databaseCreds["host"],
    databaseCreds["database"],
    databaseCreds["username"],
    databaseCreds["password"],
    databaseCreds["port"]
)

url = "https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2"
skips = list(x for x in range(0,2501,500))

headers = {
            "AccountKey" : ltaKey,
            "Accept" : "application/json"
        }

parser = argparse.ArgumentParser()
parser.add_argument('-g', '--getCarparks', help='Get list of carparks and fill up database', default=False, action='store_true')
parser.add_argument('-a', '--getAvailability', help='Update database with carpark availability', default=True, action='store_true')
parser.add_argument('-p', '--period', help='Set period of checking carpark availability', default=5)

args = parser.parse_args()

if args.getCarparks:
    for i in skips:
        param = "$skip={}".format(i)
        requestUrl = url + "?" + param

        logger.debug("Querying LTA api for carpark information with skip of {}".format(i))
        response = requests.get(requestUrl, headers=headers)

        for x in response.json()["value"]:

            try:
                logger.debug("Trying to find latitude and longitude of parking lot")
                latitude = x["Location"].split(" ")[0]
                longitude = x["Location"].split(" ")[1]
            
            except:
                logger.debug("Latitude and Longitude does not exist. Providing default value of 0")
                latitude = 0
                longitude = 0

            values = [x["CarParkID"], x["Area"], x["Development"], latitude, longitude, x["LotType"], x["Agency"]]

            insertStatement = "INSERT INTO carpark(carparkid, area, development, latitude, longitude, lottype, agency) values (%s, %s, %s, %s, %s, %s, %s)"

            if dbObj.writeData(insertStatement, values) == False:
                logger.error("Error inserting data with statement {} and values {}".format(insertStatement, values))
                exit()

    logger.info("Completed inserting carkpark information to database")

if args.getAvailability:

    while True:

        timeNow = datetime.now()
        period = args.period

        for i in skips:
            param = "$skip={}".format(i)
            requestUrl = url + "?" + param

            logger.debug("Querying LTA api for carpark information with skip of {}".format(i))
            response = requests.get(requestUrl, headers=headers)

            for x in response.json()["value"]:

                values = [x["CarParkID"], x["LotType"], x["AvailableLots"], timeNow]

                insertStatement = "INSERT INTO carparklots(carparkid, lottype, availablelots, updatetime) values (%s, %s, %s, %s)"

                if dbObj.writeData(insertStatement, values) == False:
                    logger.error("Error inserting data with statement {} and values {}".format(insertStatement, values))

        logger.info("Sleeping for {} seconds before querying carpark availability again".format(period*60))
        time.sleep(period*60)