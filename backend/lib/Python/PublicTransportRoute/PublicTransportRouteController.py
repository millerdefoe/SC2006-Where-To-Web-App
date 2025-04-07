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
                    arrivalBusStopName = step['transitDetails']['stopDetails']['arrivalStop']['name'] # Loops through JSON file to extract name of arrival bus stop names
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
        for route in responseData['routes']:
            congestionLevel = PublicTransportRouteController.getCongestionLevel(route["legs"][0]) #Refers to the list in legs
            if congestionLevel < minCongestionLevel: #Stores the smallest congestion values all the routes have
                minCongestionLevel = congestionLevel
                chosenRoute = route #Picks the least congested route

        #logger.info("Route returned by googlemap api was {}".format(chosenRoute))
        return chosenRoute 

    def sendRouteInformation(chosenRoute):
        if chosenRoute == {}:
            logger.error("No data found")
            return None
        result = {}

        #Details that will be output to frontend
        result['Routeinfo'] = "1st route is least congested. 2nd route is fastest."
        result['polyline'] = chosenRoute['polyline']
        result['distanceMeters'] = chosenRoute['distanceMeters']
        result['duration'] = chosenRoute['duration']

        tempStepList = []
        for leg in chosenRoute["legs"]:
            for step in leg['steps']: #Loops through steps
                tempDict = {}

                # If mode of travelling is WALK, outputs it. If it's transit, don't output. It will be outputting BUS/MRT at the bottom later. 
                if step['travelMode'] == "WALK":
                    tempDict['travelMode'] = step['travelMode']

                if 'transitDetails' in step.keys():
                    transitDetails = step['transitDetails']

                    #Checks if attribute stopCount is in transitDetails dictionary.
                    if 'stopCount' in transitDetails.keys():
                        tempDict['numberOfStops'] = transitDetails['stopCount']
                    
                    #Checks if attribute stopDetails is in transitDetails dictionary.
                    if 'stopDetails' in transitDetails.keys():
                        tempDict['currentStopName'] = transitDetails['stopDetails']['arrivalStop']['name']
                        tempDict['destinationStopName'] = transitDetails['stopDetails']['departureStop']['name']
                        
                        tempDict['currentStopCode'] = BusController.getBusStopCode(tempDict['currentStopName'])
                        tempDict['destinationStopCode'] = BusController.getBusStopCode(tempDict['destinationStopName'])
                        

                    #Checks if attribute transitLine is in transitDetails dictionary.  
                    if 'transitLine' in transitDetails.keys():
                        #Checks if attribute nameShort is in transitLine dictionary.
                        if 'nameShort' in transitDetails['transitLine'].keys():
                            tempDict['Line'] = transitDetails['transitLine']['nameShort']

                        tempDict['ServiceNumberOrLine'] = transitDetails['transitLine']['name']
                        tempDict['travelMode'] = transitDetails['transitLine']['vehicle']['type']
                        
                for navigationInstructionAttribute in step['navigationInstruction'].keys(): #Attributes in this case is 'maneuver', 'instructions'
                    tempDict[navigationInstructionAttribute] = step['navigationInstruction'][navigationInstructionAttribute] #Stores the information of either attribute into temp dict
                
                for localizedValuesAttribute in step['localizedValues'].keys():
                    if 'text' in step['localizedValues'][localizedValuesAttribute].keys():
                        tempDict[localizedValuesAttribute] = step['localizedValues'][localizedValuesAttribute]['text'] #Used to output distance & staticDuration
                    else:    
                        tempDict[localizedValuesAttribute] = step['localizedValues'][localizedValuesAttribute]

                tempStepList.append(tempDict) 
        
        result['steps'] = tempStepList

        return result

    def computeFastestRoute(responseData):
        chosenRoute = {}
        shortestDuration = 99999 #Arbitary number 
        for route in responseData['routes']:
            duration_str = route["duration"]
            duration = int(duration_str.rstrip('s')) #Removes the 's' and converts str to int
            if duration < shortestDuration:
                shortestDuration = duration
                chosenRoute = route
        #logger.info("Fastest route returned by googlemap api was {}".format(fastestChosenRoute))
        return chosenRoute    
    
    def getCongestionList(routes):
        returnlist = []
        title = ["leastCongested", "fastest"]
        for routeindex in range(len(routes)):
            tempdict = {
                'CongestionInfo' : title[routeindex]
            }

            FirstCurrentStopCongestionLevel = ''

            if 'steps' in routes[routeindex].keys():
                for steps in routes[routeindex]['steps']:
                    if 'travelMode' in steps.keys():
                        if steps['travelMode'] == "BUS":
                            if isinstance(steps['ServiceNumberOrLine'], str):
                                # Skip NTU Campus buses
                                service_name = steps['ServiceNumberOrLine'].lower()
                                if "campus loop" not in service_name and "campus rider" not in service_name:
                                    if 'ServiceNumberOrLine' in steps.keys() and 'currentStopCode' in steps.keys() and 'destinationStopCode' in steps.keys():

                                        currentStopCongestionLevel = BusController.getBusCongestionLevel(steps['currentStopCode'],steps['ServiceNumberOrLine'])
                                        destinationStopCongestionLevel = BusController.getBusCongestionLevel(steps['destinationStopCode'],steps['ServiceNumberOrLine'])

                                        if FirstCurrentStopCongestionLevel == '':
                                            FirstCurrentStopCongestionLevel = { 
                                                "travelMode": steps['travelMode'],
                                                "ServiceNumberOrLine": steps['ServiceNumberOrLine'],
                                                "currentStopName": steps['currentStopName'],
                                                "crowdLevel" : currentStopCongestionLevel
                                            } 

                                        lastDestinationStopCongestionLevel = {
                                            "travelMode": steps['travelMode'],
                                            "ServiceNumberOrLine": steps['ServiceNumberOrLine'],
                                            "destinationStopName": steps['destinationStopName'],
                                            "crowdLevel" : destinationStopCongestionLevel
                                        }

                                    else:
                                        logger.error("No Bus information found")
                                        return None
                                    
                        elif steps['travelMode'] == "SUBWAY":
                            if 'currentStopName' in steps.keys() and 'destinationStopName' in steps.keys():
                                arrivalStationNumber = MRTController.getMRTStationNumber(steps['currentStopName'])
                                destinationStationNumber = MRTController.getMRTStationNumber(steps['destinationStopName'])

                                arrivalMRTCongestionLevel = MRTController.getMRTCongestionLevel(arrivalStationNumber)
                                destinationMRTCongestionLevel = MRTController.getMRTCongestionLevel(destinationStationNumber)

                                if FirstCurrentStopCongestionLevel == '':
                                    FirstCurrentStopCongestionLevel = { 
                                        "travelMode": steps['travelMode'],
                                        "currentStopName": steps['currentStopName'],
                                        "ServiceNumberOrLine": steps['ServiceNumberOrLine'],
                                        "crowdLevel" : arrivalMRTCongestionLevel
                                    } 

                                lastDestinationStopCongestionLevel = {
                                    "travelMode": steps['travelMode'],
                                    "ServiceNumberOrLine": steps['ServiceNumberOrLine'],
                                    "destinationStopName": steps['destinationStopName'],
                                    "crowdLevel" : destinationMRTCongestionLevel
                                }

                    else:
                        logger.error("No Travel Mode information found")
                        return None
            else:
                logger.error("No route information found")
                return None
            
            tempdict['FirstCurrentStopCongestionLevel'] = FirstCurrentStopCongestionLevel
            tempdict['lastDestinationStopCongestionLevel'] = lastDestinationStopCongestionLevel
            returnlist.append(tempdict)
            
        return returnlist