import requests
import json
import os
import subprocess
import time
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
                    break #Once it hits transit, it breaks from the loop and distance is no longer counted
            
            if sumofWalking < maxWalkingDistance: #If total walking is less than what the user has set the max to be
                result["routes"].append(route) # Resulted route that will be saved into the list

        return result #Converts dictionary object to JSON

    def getCongestionLevel(route):
        MRTController.updateCongestionDatabase() #Updates congestion database for MRT 
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

    # def getTransportInfo(route):
    #     for step in route["steps"]:
    #         #For MRT mode of transport
    #         if step['travelMode'] == "TRANSIT":
    #             if step['transitDetails']['transitLine']['vehicle']['type'] == "SUBWAY": 
    #                 arrivalMRTName = step['transitDetails']['stopDetails']['arrivalStop']['name'] # Loops through JSON file to extract name of MRT stations
    #                 destinationMRTName = step['transitDetails']['stopDetails']['departureStop']['name']
                
    #                 arrivalStationNumber = MRTController.getMRTStationNumber(arrivalMRTName) #Saves station number to be used for API call for congestion level
    #                 destinationStationNumber = MRTController.getMRTStationNumber(destinationMRTName)

    #                 arrivalMRTCongestionLevel = MRTController.getMRTCongestionLevel(arrivalStationNumber)
    #                 destinationMRTCongestionLevel = MRTController.getMRTCongestionLevel(destinationStationNumber)

    def computeLeastCongestedRoute(responseData):
        chosenRoute = {}
        minCongestionLevel = 99999 #Arbitary number 
        for route in responseData['routes']:
            congestionLevel = PublicTransportRouteController.getCongestionLevel(route["legs"][0]) #Refers to the list in legs
            if congestionLevel < minCongestionLevel: #Stores the smallest congestion values all the routes have
                minCongestionLevel = congestionLevel
                chosenRoute = route #Picks the least congested route

        #logger.info("Route returned by googlemap api was {}".format(chosenRoute))
        return chosenRoute 

    def sendLeastCongestedRouteInformation(chosenRoute):
        if chosenRoute == {}:
            logger.error("No data found")
            return None
        result = {}
        result['Routeinfo'] = "Least congested route information"
        result['polyline'] = chosenRoute['polyline']
        result['distanceMeters'] = chosenRoute['distanceMeters']
        result['duration'] = chosenRoute['duration']

        tempStepList = []
        for leg in chosenRoute["legs"]:
            for navigationInstruction in leg['steps']: #Loops through steps
                tempDict = {}

                for attribute in navigationInstruction['navigationInstruction'].keys(): #Attributes in this case is 'maneuver', 'instructions'
                    tempDict[attribute] = navigationInstruction['navigationInstruction'][attribute] #Stores the information of either attribute into temp dict
                
                tempStepList.append(tempDict) #Appends tempDict to tempStepList 
        
        result['steps'] = tempStepList

        return result

    def computeFastestRoute(responseData):
        fastestChosenRoute = {}
        shortestDuration = 99999 #Arbitary number 
        for route in responseData['routes']:
            duration_str = route["duration"]
            duration = int(duration_str.rstrip('s'))  
            if duration < shortestDuration:
                shortestDuration = duration
                fastestChosenRoute = route["legs"][0]

        #logger.info("Fastest route returned by googlemap api was {}".format(fastestChosenRoute))
        return fastestChosenRoute    
    
    def sendFastestRouteInformation(fastestChosenRoute):
        if fastestChosenRoute == {}:
            logger.error("No data found")
            return None
        
        result = {}
        result['Routeinfo'] = "Fastest route information"
        result['distanceMeters'] = fastestChosenRoute['distanceMeters']
        result['duration'] = fastestChosenRoute['duration']
        result['polyline'] = fastestChosenRoute['polyline']

        tempStepList = []
        for navigationInstruction in fastestChosenRoute['steps']: #Loops through steps
            tempDict = {}

            for attribute in navigationInstruction['navigationInstruction'].keys(): #Attributes in this case is 'maneuver', 'instructions'
                tempDict[attribute] = navigationInstruction['navigationInstruction'][attribute] #Stores the information of either attribute into temp dict
            
            tempStepList.append(tempDict) #Appends tempDict to tempStepList 
        
        result['steps'] = tempStepList

        return result