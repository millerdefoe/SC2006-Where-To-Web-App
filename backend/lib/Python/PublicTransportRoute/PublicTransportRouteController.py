import requests
import json
import os

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Helper.HelperFunctions import getGoogleMapAPIKey
from lib.Python.Helper.HelperFunctions import compareGoogleAPITimings
from lib.Python.MRT.MRTController import MRTController
from lib.Python.Bus.BusController import BusController

logger = PythonLogger(os.path.basename(__file__))

apiKeyPath = os.path.join(".", "creds", "priv", "googleMapApi.json")
googleApiKey = getGoogleMapAPIKey(apiKeyPath)

class PublicTransportRouteController():
    
    def __init__(self): 
        return 
    
    def getPublicTransportRoute(currentLocation, destinationLocation):

        url = "https://routes.googleapis.com/directions/v2:computeRoutes"

        headers = {
            "X-Goog-Api-Key" : googleApiKey,
            "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.routeLabels,routes.polyline.encodedPolyline,routes.legs"
        }

        body = {
            "origin" : {
                "location": {
                    "latLng": {
                        "latitude": currentLocation.latitude,
                        "longitude": currentLocation.longitude
                    }
                }
            },
            "destination" : {
                "location": {
                    "latLng": {
                        "latitude": destinationLocation.latitude,
                        "longitude": destinationLocation.longitude
                    }
                }
            },
            "travelMode": "TRANSIT",
            "computeAlternativeRoutes": True
        }

        logger.info("Querying google map api for various public transport routes")
        response = requests.post(url, headers=headers, json=body)

        responseData = response.json()
        if responseData == {}:

            logger.info("No route was returned by googlemaps api")
            return None
        else:
            return responseData
    
    def limitWalkingDistance(responseData, maxWalkingDistance):
        result = {
            "routes" : [] #Template
        }
        
        for route in responseData['routes']:
            sumofWalking = 0 #Total Walking Distance from current location to mrt station or bus stop
            for step in route["legs"][0]["steps"]:
                if step["travelMode"] == 'WALK':
                    sumofWalking += step["distanceMeters"]
                else:
                    break
            
            if sumofWalking < maxWalkingDistance: #If total walking is less than what the user has set the max to be
                result["routes"].append(route) # Resulted route that will be saved into the list

        return result #Converts dictionary object to JSON

    def getCongestionLevel(route):
        sumofCongestion = 0 #Total congestion levels from mrt and bus
        count = 0 #Increments every time you add a congestion level
        for step in route["steps"]:
            #For MRT mode of transport
            if step['travelMode'] == "TRANSIT":
                if step['transitDetails']['transitLine']['vehicle']['type'] == "SUBWAY": 
                    arrivalMRTName = step['transitDetails']['stopDetails']['arrivalStop']['name'] # Loops through JSON file to extract name of MRT stations
                    destinationMRTName = step['transitDetails']['stopDetails']['departureStop']['name']
                
                    arrivalStationNumber = MRTController.getMRTStationNumber(arrivalMRTName) #Saves station number to be used for API call for congestion level
                    destinationStationNumber = MRTController.getMRTStationNumber(destinationMRTName)

                    arrivalMRTCongestionLevel = MRTController.getMRTCongestionLevel(arrivalStationNumber)
                    destinationMRTCongestionLevel = MRTController.getMRTCongestionLevel(destinationStationNumber)
                    count += 1 
                    match arrivalMRTCongestionLevel:
                        case "l":
                            sumofCongestion += 1
                            break
                        case "m":
                            sumofCongestion += 2
                            break
                        case "h":
                            sumofCongestion += 3
                            break
                    count += 1
                    match destinationMRTCongestionLevel:
                        case "l":
                            sumofCongestion += 1
                            break
                        case "m":
                            sumofCongestion += 2
                            break
                        case "h":
                            sumofCongestion += 3
                            break
                elif step['transitDetails']['transitLine']['vehicle']['type'] == "BUS": #For Bus mode of transport. Only need arrival bus's congestion level logically since that is where we want to take the bus. 
                    arrivalBusServiceNumber = step['transitDetails']['transitLine']['name'] #Gets bus service number that user is taking
                    arrivalBusStopName = step['transitDetails']['stopDetails']['arrivalStop']['name'] # Loops through JSON file to extract name of MRT stations
                    arrivalBusStopCode = BusController.getBusStopCode(arrivalBusStopName) #Saves bus stop code to be used for API call for congestion level
                    arrivalBusCongestionLevel = BusController.getBusCongestionLevel(arrivalBusStopCode, arrivalBusServiceNumber)
                    count += 1 
                    match arrivalBusCongestionLevel:
                        case "SEA":
                            sumofCongestion += 1
                            break
                        case "SDA":
                            sumofCongestion += 2
                            break
                        case "LSD":
                            sumofCongestion += 3
                            break
        return sumofCongestion / count #Returns average congestion level of this one route

    def computeLeastCongestedRoute(responseData):
        chosenRoute = {}
        minCongestionLevel = 99999 #Arbitary number 
        for i in responseData['routes']:
            congestionLevel = PublicTransportRouteController.getCongestionLevel(i["legs"][0]) #Refers to the list in legs
            if congestionLevel < minCongestionLevel: #Stores the smallest congestion values all the routes have
                minCongestionLevel = congestionLevel
                chosenRoute = i["legs"][0] #Picks the least congested route

        logger.info("Route returned by googlemap api was {}".format(chosenRoute))
        return chosenRoute 

    def getPolylineFromRoute(chosenRoute):
        return chosenRoute['polyline']
    