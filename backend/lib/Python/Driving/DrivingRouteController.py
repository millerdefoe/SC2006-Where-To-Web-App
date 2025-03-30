import requests
import json
import os

from math import cos

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Helper.HelperFunctions import getGoogleMapAPIKey
from lib.Python.Helper.HelperFunctions import compareGoogleAPITimings

logger = PythonLogger(os.path.basename(__file__))

apiKeyPath = os.path.join(".", "creds", "priv", "googleMapApi.json")
googleApiKey = getGoogleMapAPIKey(apiKeyPath)

class DrivingRouteController():

    def __init__(self):
        
        return

    def getRoute(self, startPoint, endPoint):

        url = "https://routes.googleapis.com/directions/v2:computeRoutes"

        headers = {
            "X-Goog-Api-Key" : googleApiKey,
            "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs"
        }

        body = {
            "origin" : {
                "location": {
                    "latLng": {
                        "latitude": startPoint.latitude,
                        "longitude": startPoint.longitude
                    }
                }
            },
            "destination" : {
                "location": {
                    "latLng": {
                        "latitude": endPoint.latitude,
                        "longitude": endPoint.longitude
                    }
                }
            },
            "travelMode": "DRIVE",
            "routingPreference": "TRAFFIC_AWARE",
        }

        logger.info("Querying google map api for fastest route")
        response = requests.post(url, headers=headers, json=body)

        responseData = response.json()

        if responseData == {}:

            logger.info("No route was returned by googlemaps api")
            return None

        route = {
            "distance" : 0,
            "duration" : "10000000s",
            "polyline" : None
        }

        for i in responseData["routes"]:
            if compareGoogleAPITimings(i["duration"], route["duration"]):
                route["duration"] = i["duration"]
                route["distance"] = i["distanceMeters"]
                route["polyline"] = i["polyline"]["encodedPolyline"]
                route["legs"] = i["legs"][0]["steps"]

        route["steps"] = []

        for i in route["legs"]:

            stepsDict = {
                "duration" : i["localizedValues"]["staticDuration"]["text"],
                "distance" : i["localizedValues"]["distance"]["text"],
                "polyline" : i["polyline"]["encodedPolyline"],
                "instructions" : i["navigationInstruction"]["instructions"]
            }

            route["steps"].append(stepsDict)

        del route["legs"]

        logger.info("Route returned by googlemap api was {}".format(route))
        return route

    def getDistance(self, startPoint, endPoint):

        data = self.getRoute(startPoint, endPoint)

        if data == None:
            return None
        
        return data["distance"]

    def getTrafficInfo(self):

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