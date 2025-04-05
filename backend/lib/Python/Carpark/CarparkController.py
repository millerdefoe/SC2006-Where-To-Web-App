import requests
import json
import os
from datetime import datetime

from lib.Python.Logging.PythonLogger import PythonLogger

logger = PythonLogger(os.path.basename(__file__))

class CarparkController():

    def __init__(self):

        return

    def getCarparkName(self, carparkId, dbObj):

        logger.info("Getting carpark name for carpark ID {}".format(carparkId))

        queryStatement = "SELECT area,development FROM carpark WHERE carparkid = '{}'".format(carparkId)

        data = dbObj.readData(queryStatement)

        if data[0] == []:

            return False

        return data[0][0]

    def getCarparkID(self, area, development, dbObj):

        logger.info("Getting carpark ID for carpark {} {}".format(area, development))

        queryStatement = "SELECT carparkid FROM carpark WHERE area = '{}' AND development = '{}'".format(area, development)

        data = dbObj.readData(queryStatement)

        if data[0] == []:

            return False

        return data[0][0]

    def getAvailableLots(self, carparkId, dbObj):

        logger.info("Getting available lots for carpark ID {}".format(carparkId))

        queryStatement = "SELECT DISTINCT ON (carparkid, lottype) carparkid, lottype, availablelots, updatetime FROM carparklots WHERE carparkid = '{}' ORDER BY carparkid, lottype, updatetime DESC".format(carparkId)

        data = dbObj.readData(queryStatement)

        if data == []:

            return False

        return data

    def getCarparkRate(self, carparkId, dbObj):

        logger.info("Getting carpark rate for carpark ID {}".format(carparkId))

        agency = self.getCarparkAgency(carparkId, dbObj)

        if agency == "HDB":

            priceString = "$0.60/half hour"

            return priceString

        # queryStatement = "SELECT rate FROM carpark WHERE carparkid = '{}'".format(carparkId)

        # data = dbObj.readData(queryStatement)

        # if data[0] == []:

        #     return False

        # return data[0][0]

        return "7am-6pm: $2.14 for 1st hr; $1.39 for sub. half hr"

    def getCarparkAgency(self, carparkId, dbObj):

        logger.info("Getting carpark agency for carpark ID {}".format(carparkId))

        queryStatement = "SELECT agency FROM carpark WHERE carparkid = '{}'".format(carparkId)

        data = dbObj.readData(queryStatement)

        if data == []:

            return False

        return data[0][0]

    def bookCarpark(self, carparkId, lotType, userId, startTime, duration, dbObj):

        logger.info("Attempting to book carpark {}/{} for user {}. Start time of booking: {}. Duration of booking: {}".format(carparkId, lotType, userId, startTime, duration))

        try:

            insertStatement = "INSERT INTO bookings(carparkid, lottype, userid, startTime, duration) values (%s, %s, %s, %s, %s)"

            if lotType not in ["C", "M", "Y", "S", "H", "L"]:
                logger.error("Lot type provided was not valid: {}".format(duration))
                return False, "Lot type provided was not valid: {}".format(duration)

            try:
                duration = int(duration) # Raises value error upon failure
            except ValueError:
                logger.error("Duration provided was not an integer: {}".format(duration))
                return False, "Duration provided was not an integer: {}".format(duration)
            except:
                logger.error("Error with duration provided: {}".format(duration))
                return False, "Error with duration provided: {}".format(duration)

            try:
                startTime = datetime.strptime(startTime, "%d-%m-%Y %H:%M:%S")
            except ValueError:
                logger.error("Start time provided was not valid: {}".format(startTime))
                return False, "Start time provided was not valid: {}".format(startTime)
            except:
                logger.error("Error with start time provided: {}".format(startTime))
                return False, "Error with start time provided: {}".format(startTime)

            values = [carparkId, lotType, userId, startTime, duration]

            if dbObj.writeData(insertStatement, values):
                logger.info("Successfully created booking given parameters above.")
                return 1, "success"

            logger.error("Error creating booking. Please check logs")
            return False, "Error creating booking. Please check logs"

        except Exception as e:

            logger.error(e)
            logger.info(traceback.print_exc())
            return False, str(e)

    def updateCarparkRate(carparkId, rate):

        return True

    def updateAvailableLots(carparkId, lots):

        return True

    def updateCarparkName(carparkId, carparkName):

        return True