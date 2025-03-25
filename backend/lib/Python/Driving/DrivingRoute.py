import requests
import json
import os

from math import cos

from lib.Python.Logging.PythonLogger import PythonLogger

logger = PythonLogger(os.path.basename(__file__))

class DrivingRoute():

    def __init__(self):
        
        return

    def setStartPoint(startPoint):

        return True

    def setEndPoint(endPoint):

        return True

    def setStartEndPoint(startPoint, endPoint):

        self.setStartPoint(startPoint)
        self.setEndPoint(endPoint)

        return True

    def getRoute():

        return True

    def getDistance():

        return True

    def getTrafficInfo():

        return True

    def getNearbyCarparks(self, latitude, longitude, maxrange, dbObj):

        logger.info("Finding nearby carparks given latitude: {}, longitude: {} and max range {}".format(latitude, longitude, maxrange))
        lat_min = latitude - (maxrange / 111.32)
        lat_max = latitude + (maxrange / 111.32)
        lon_min = longitude - (maxrange / (111.32 * cos(latitude)))
        lon_max = longitude + (maxrange / (111.32 * cos(latitude)))

        queryStatement = f"""
            SELECT carparkid, area, development, latitude, longitude, lottype
            FROM carpark
            WHERE latitude BETWEEN {lat_min} AND {lat_max}
            AND longitude BETWEEN {lon_min} AND {lon_max}
            AND earth_distance(
                ll_to_earth(latitude, longitude),
                ll_to_earth({latitude}, {longitude})
            ) <= {maxrange * 1000};  -- Convert km to meters
        """

        logger.debug("Running query string to find carparks within limit")
        data = dbObj.readData(queryStatement)

        if data != []:
            logger.debug("Carparks exist in range")
            return data
        
        else:
            logger.debug("Carparks do not exist in range")
            return False