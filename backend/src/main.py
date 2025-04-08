from flask import Flask
from flask import jsonify
from flask import session
# from flask_session import Session
from flask_cors import CORS
from flask import request

import json
import os

import requests

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Helper.HelperFunctions import getGoogleMapAPIKey
from lib.Python.User.UserController import UserController
from lib.Python.Helper.HelperFunctions import loadDatabaseCredentials
from lib.Python.Database.Database import Database
from lib.Python.Carpark.CarparkController import CarparkController
from lib.Python.Driving.DrivingRouteController import DrivingRouteController
from lib.Python.Location.Location import Location
from lib.Python.PublicTransportRoute.PublicTransportRouteController import PublicTransportRouteController

logger = PythonLogger(os.path.basename(__file__))

app = Flask(__name__)
CORS(app)

apiKeyPath = os.path.join(".", "creds", "priv", "googleMapApi.json")
googleApiKey = getGoogleMapAPIKey(apiKeyPath)

databaseCredsPath = os.path.join(".", "creds", "priv", "database.json")

databaseCreds = loadDatabaseCredentials(databaseCredsPath)

dbObj = Database(
    databaseCreds["host"],
    databaseCreds["database"],
    databaseCreds["username"],
    databaseCreds["password"],
    databaseCreds["port"]
)

userController = UserController()
drivingRouteController = DrivingRouteController()
carparkController = CarparkController()

@app.route("/heartbeat", methods=["GET", "POST"])
def heartbeat():

    logger.debug("Heartbeat API called")
    return jsonify({"heartbeat" : "ok"}), 200

# Placeholder function without proper class/module structure
@app.route("/getBasicRoute", methods=["GET", "POST"])
def getBasicRoute():

    logger.info("Getting route directly from google map API")

    try:
        source = request.get_json()["source"]

    except:
        return {"error": "No source was specified"}, 400

    try:
        destination = request.get_json()["destination"]

    except:
        return {"error": "No destination was specified"}, 400

    logger.info("Source of route: {}. Destination of route: {}. Travel mode: Drive. Routing preference: Traffice_Aware".format(source, destination))

    url = "https://routes.googleapis.com/directions/v2:computeRoutes"
    bodyData = {
        "origin": {
            "address": source
            },
        "destination": {
            "address": destination
            },
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE",
    }


    headers = {
        "X-Goog-Api-Key" : googleApiKey,
        "X-Goog-FieldMask" : "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        "Content-Type" : "application/json"
    }

    logger.debug("Sending request to google map api")
    logger.debug("Body: {}".format(bodyData))
    logger.debug("Headers: {}".format(headers))

    try:
        response = requests.post(url, json = bodyData, headers = headers)
    
    except:
        return {"error": "Error retrieving route from google api"}, 400

    logger.debug("Response received. Decoding google map api response into dictionary for parsing")

    responseData = response.json()

    if "routes" not in responseData or not responseData["routes"]:
        logger.error("Google Maps API returned no routes. Full response: {}".format(responseData))
        return {"error": "No routes found for this origin/destination"}, 400

    encodedPolyline = responseData["routes"][0]["polyline"]["encodedPolyline"]
    duration = responseData["routes"][0]["duration"]
    distance = responseData["routes"][0]["distanceMeters"]

    returnData = {
        "polyline" : encodedPolyline,
        "duration" : duration,
        "distance" : distance
    }

    logger.info("Returning data {} with status code 200".format(returnData))

    return returnData, 200

@app.route("/getRoute", methods=["GET", "POST"])
def getRoute():

    logger.info("Getting route from google map API")

    try:
        source = request.get_json()["source"]
        startPoint = Location(source["latitude"], source["longitude"])

    except:
        return {"error": "No source was specified"}, 400

    try:
        destination = request.get_json()["destination"]
        endPoint = Location(destination["latitude"], destination["longitude"])

    except:
        return {"error": "No destination was specified"}, 400

    logger.info("Source of route: {}. Destination of route: {}. Travel mode: Drive. Routing preference: Traffice_Aware".format(source, destination))

    data = drivingRouteController.getRoute(startPoint, endPoint)

    if data == None:
        logger.error("No route was specified")
        returnData = {
            "status": "Route not found",
            "reason" : "Contact admin"
        }
        return jsonify(returnData), 400

    if data == False:
        logger.error("No route was specified")
        returnData = {
            "status": "Route not found",
            "reason" : "Error in route found by google API. Contact admin"
        }
        return jsonify(returnData), 400

    return jsonify(data), 200

@app.route("/createUser", methods=["POST"])
def createUser():

    logger.info("Create user route accessed. Attempting to create new user")
    logger.info("Checking for validity of information provided")

    try:
        data = request.get_json()
        if "username" not in data.keys() or "password" not in data.keys():
            raise Exception

        username = data["username"]
        password = data["password"]

        if "rfid" in data.keys():
            rfid = data["rfid"]

        else:
            rfid = None

    except Exception as e:

        logger.error("Required information to create user was not provided. Returning error 400")
        returnData = {
            "status" : "user not created",
            "reason" : "username and/or password was not provided"
        }

        return jsonify(returnData), 400

    if userController.checkUsernameTaken(username, dbObj) == 0:
        logger.debug("Duplicate username detected. Username: {}".format(username))
        returnData = {
            "status": "user not created",
            "reason" : "duplicate username"
        }
        return jsonify(returnData), 400

    result = userController.createUser(username, password, rfid, dbObj)

    if result == False:
        logger.debug("Database error when creating user. Please check logs")
        returnData = {
            "status": "user not created",
            "reason" : "backend error"
        }
        return jsonify(returnData), 400

    logger.info("Returning json specifying user has been created alongside userid")
    returnData = {
        "status": "user created",
        "userid" : result,
        "rfid" : rfid
    }
    return jsonify(returnData), 200

@app.route("/deleteUser", methods=["GET", "POST"])
def deleteUser():

    logger.info("Delete user route accessed. Attempting to create new user")
    logger.info("Checking for validity of information provided")

    try:
        data = request.get_json()
        if "userid" not in data.keys():
            raise Exception

        userid = data["userid"]

    except Exception as e:

        logger.error("Required information to delete user was not provided. Returning error 400")
        returnData = {
            "status" : "user not deleted",
            "reason" : "userid was not provided"
        }

        return jsonify(returnData), 400

    result = userController.deleteUser(userid, dbObj)

    if result == False:
        logger.debug("Database error when deleting user. Please check logs")
        returnData = {
            "status": "user not deleted",
            "reason" : "backend error"
        }
        return jsonify(returnData), 400

    logger.info("Returning json specifying deleted user's userid")
    returnData = {
        "status": "user deleted",
        "userid" : result
    }
    return jsonify(returnData), 200

@app.route("/editUser", methods=["GET", "POST"])
def editUser():

    logger.info("Create user route accessed. Attempting to create new user")
    logger.info("Checking for validity of information provided")

    try:
        data = request.get_json()
        if "username" not in data.keys() or ("password" not in data.keys() and "rfid" not in data.keys()):
            raise Exception

        username = data["username"]

        if "password" in data.keys():
            password = data["password"]

        else:
            password = None

        if "rfid" in data.keys():
            rfid = data["rfid"]

        else:
            rfid = None

    except Exception as e:

        logger.error("Required information to create user was not provided. Returning error 400")
        returnData = {
            "status" : "user information was not editted",
            "reason" : "required fields were not present"
        }

        return jsonify(returnData), 400
    
    result = userController.editUserDetails(username, password, rfid, dbObj)

    if result == False:
        logger.debug("Database error when editting user. Please check logs")
        returnData = {
            "status": "user details not editted",
            "reason" : "backend error"
        }
        return jsonify(returnData), 400

    logger.info("Returning json specifying user information has been editted alongside userid")
    returnData = {
        "status": "user editted",
        "userid" : result
    }
    return jsonify(returnData), 200

@app.route("/login", methods=["POST"])
def login():

    logger.info("Create user route accessed. Attempting to create new user")
    logger.info("Checking for validity of information provided")

    try:
        data = request.get_json()
        if "username" not in data.keys() or "password" not in data.keys():
            raise Exception

        username = data["username"]
        password = data["password"]

    except Exception as e:

        logger.error("Login information was not provided. Returning error 400")
        returnData = {
            "status" : "login failure",
            "reason" : "username and/or password was not provided"
        }

        return jsonify(returnData), 400

    result, userid = userController.loginUser(username, password, dbObj)

    if result == -1:

        logger.debug("Username does not exist when logging in")

        returnData = {
            "status" : "login failure",
            "reason" : "username does not exist"
        }

        return jsonify(returnData), 400
    
    if result == 0:

        logger.debug("Password mismatch when logging in")

        returnData = {
            "status" : "login failure",
            "reason" : "password mismatch"
        }

        return jsonify(returnData), 400

    query = f"SELECT rfid FROM users WHERE username = '{username}'"
    rfid_data = dbObj.readData(query)
    rfid_value = rfid_data[0][0] if rfid_data and rfid_data[0][0] else None

    returnData = {
        "status" : "login success",
        "userid" : userid,
        "username": username,
        "token" : "temporarytokenfortesting",
        "rfid": rfid_value
    }

    logger.info("Login for user {} was successful. Returning userid and token")
    return jsonify(returnData), 200

@app.route("/carparksNearby", methods=["GET", "POST"])
def carparksNearby():

    logger.info("carparksNearby route accessed. Verifying information provided")

    try:
        data = request.get_json()
        if "latitude" not in data.keys() or "longitude" not in data.keys():
            raise Exception

        latitude = float(data["latitude"])
        longitude = float(data["longitude"])

    except ValueError:

        logger.error("Coordinate information provided was not a number. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "Coordinate information was not a number"
        }

        return jsonify(returnData), 400

    except Exception as e:

        logger.error("Coordinate information was not provided. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "Coordinate information was not provided"
        }

        return jsonify(returnData), 400

    if "maxrange" in data.keys():

        try:
            maxrange = float(data["maxrange"])

        except:
            logger.error("Max Range provided was not a number. Defaulting to 5")
            maxrange = 0.8
    
    else:

        maxrange = 0.8

    data = drivingRouteController.getNearbyCarparks(latitude, longitude, maxrange, dbObj)

    if data == False:

        logger.debug("Error when retrieving carparks around area. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "backend error"
        }

        return jsonify(returnData), 400

    return jsonify(data), 200

@app.route("/carparkPricing", methods=["GET", "POST"])
def carparkPricing():

    logger.info("carparkPricing route accessed. Verifying information provided")

    try:
        data = request.get_json()

        carparkId = data["carparkId"]

    except Exception as e:

        logger.error("carparkId was not provided. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "carparkId was not provided"
        }
        return jsonify(returnData), 400
    
    rate = carparkController.getCarparkRate(carparkId, dbObj)

    if rate == False:
        logger.error("Rate not found for carpark {}".format(carparkId))
        returnData = {
            "status" : "failure",
            "reason" : "Rate was not found for carparkID"
        }
        return jsonify(returnData), 400
    
    returnData = {
        "rate" : rate
    }

    return jsonify(returnData), 200
    

@app.route("/carparkLots", methods=["GET", "POST"])
def carparkLots():

    logger.info("carparkLots route accessed. Verifying information provided")

    try:
        data = request.get_json()

        carparkId = data["carparkId"]

    except Exception as e:

        logger.error("carparkId was not provided. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "carparkId was not provided"
        }

        return jsonify(returnData), 400

    lots = carparkController.getAvailableLots(carparkId, dbObj)

    if lots == False:
        logger.error("Available lots not found for carpark {}".format(carparkId))
        returnData = {
            "status" : "failure",
            "reason" : "Lots were not found for carparkID"
        }

        return jsonify(returnData), 400

    returnData = {}

    for i in lots:

        returnData[i[1]] = i[2]

    return jsonify(returnData), 200

@app.route("/bookCarpark", methods=["GET", "POST"])
def bookCarpark():

    logger.info("bookCarpark route accessed. Verifying information provided")

    try:
        data = request.get_json()

        if "carparkId" not in data.keys():
            raise Exception("CarparkID was not provided")
        if "lotType" not in data.keys():
            raise Exception("LotType was not provided")
        if "userId" not in data.keys():
            raise Exception("Userid was not provided")
        if "startTime" not in data.keys():
            raise Exception("StartTime was not provided")
        if "duration" not in data.keys():
            raise Exception("Duration was not provided")

        carparkId = data["carparkId"]
        lotType = data["lotType"]
        userId = data["userId"]
        startTime = data["startTime"]
        duration = data["duration"]

    except Exception as e:

        logger.error("{}. Returning error 400".format(e))
        returnData = {
            "status" : "failure",
            "reason" : str(e)
        }

        return jsonify(returnData), 400

    logger.info("Data has been verified, attempting to make new booking")
    result, reason = carparkController.bookCarpark(carparkId, lotType, userId, startTime, duration, dbObj)

    if result == False:
        returnData = {
            "status" : "failure",
            "reason" : reason
        }

        return jsonify(returnData), 400
    
    returnData = {
        "status" : "success",
        "reason" : "Booking for {}/{} : {} | {}-{} was successful".format(carparkId, lotType, userId, startTime, duration)
    }

    return jsonify(returnData), 200

@app.route("/getBookings", methods=["GET", "POST"])
def getBookings():

    logger.info("getBookings route accessed. Verifying information provided")

    try:
        data = request.get_json()

        if "username" not in data.keys():
            raise Exception("username was not provided")
    
    except Exception as e:

        logger.error("{}. Returning error 400".format(e))
        returnData = {
            "status" : "failure",
            "reason" : str(e)
        }

        return jsonify(returnData), 400

    username = data["username"]

    logger.info("Data has been verified, attempting to retrieve bookings for user")
    result = carparkController.getBookings(username, dbObj)

    if result == False:
        logger.error("Error retrieiving booking. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "No bookings available"
        }

        return jsonify(returnData), 400
    
    if result == False or result == []:
        logger.info("No bookings found for user.")
        return jsonify([]), 200  # Return an empty array, not error

    logger.info("Returning bookings for user")
    return jsonify(result), 200

@app.route("/deleteBooking", methods=["GET", "POST"])
def deleteBooking():
    
    logger.info("deleteBooking route accessed. Verifying information provided")

    try:
        data = request.get_json()

        if "username" not in data.keys():
            raise Exception("username was not provided")
        if "carparkid" not in data.keys():
            raise Exception("carparkid was not provided")
        if "starttime" not in data.keys():
            raise Exception("starttime was not provided")

        username = data["username"]
        carparkid = data["carparkid"]
        starttime = data["starttime"]
    
    except Exception as e:

        logger.error("{}. Returning error 400".format(e))
        returnData = {
            "status" : "failure",
            "reason" : str(e)
        }

        return jsonify(returnData), 400

    logger.info("Data has been verified, attempting to retrieve bookings for user")
    result = carparkController.deleteBooking(username, carparkid, starttime, dbObj)

    if result == False:
        logger.error("Error retrieiving booking. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "Contact backend team"
        }

        return jsonify(returnData), 400

    logger.info("Successfully deleted booking")
    returnData = {
        "status" : "success",
        "reason" : "deleted booking"
    }
    return jsonify(returnData), 200

@app.route("/checkinCarpark", methods=["GET", "POST"])
def checkinCarpark():

    logger.info("checkinCarpark route accessed. Verifying information provided")

    try:
        data = request.get_json()

        if "carparkId" not in data.keys():
            raise Exception("CarparkID was not provided")
        if "lotType" not in data.keys():
            raise Exception("LotType was not provided")
        if "rfid" not in data.keys():
            raise Exception("Userid was not provided")
        if "time" not in data.keys():
            raise Exception("StartTime was not provided")

        carparkId = data["carparkId"]
        lotType = data["lotType"]
        rfid = data["rfid"]
        time = data["time"]

    except Exception as e:

        logger.error("{}. Returning error 400".format(e))
        returnData = {
            "status" : "failure",
            "reason" : str(e)
        }

        return jsonify(returnData), 400

    result = carparkController.checkinCarpark(carparkid, lottype, rfid, time, dbObj)

    if result == False:

        logger.error("Unable to checkin. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "Booking not available. Else, contact backend team"
        }

        return jsonify(returnData), 400

    returnData = {
        "status" : "success",
        "reason" : "Checkin successful"
    }

    return jsonify(returnData), 200

@app.route("/PublicTransportRoute", methods=["GET", "POST"])
def PublicTransportRoute():
    logger.info("Public Transport Route accessed. Verifying information provided")

    try:
        data = request.get_json()
        if "currentLocation" not in data.keys() or "destinationLocation" not in data.keys():
            logger.error("Rasing Exception")
            raise Exception

        currentLocation = Location(data["currentLocation"]["latitude"],data["currentLocation"]["longitude"])
        destinationLocation = Location(data["destinationLocation"]["latitude"],data["destinationLocation"]["longitude"])
        maxWalkingDistance = data["maxWalkingDistance"]

    except ValueError:

        logger.error("Coordinate information provided was not a number. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "Coordinate information was not a number"
        }

    except Exception as e:

        logger.error(f"Coordinate information was not provided. {e} Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "Coordinate information was not provided"
        }

    publicTransportRouteData = PublicTransportRouteController.getPublicTransportRoute(currentLocation, destinationLocation)
    if publicTransportRouteData == False or publicTransportRouteData == None:

        logger.debug("Error when retrieving public transport route. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "backend error"
        }

        return jsonify(returnData), 400
    
    limitWalkingDistanceData = PublicTransportRouteController.limitWalkingDistance(publicTransportRouteData, maxWalkingDistance)
    if limitWalkingDistanceData == False or limitWalkingDistanceData == None:

        logger.debug("Error when retrieving public transport route with maximum walking distance considered. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "backend error"
        }

        return jsonify(returnData), 400
    
    chosenLeastCongestedRouteData = PublicTransportRouteController.computeLeastCongestedRoute(limitWalkingDistanceData)
    if chosenLeastCongestedRouteData == False:

        logger.debug("Error when retrieving the least congested route. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "backend error"
        }

        return jsonify(returnData), 400
    
    sendLeastCongestedRouteInformation = PublicTransportRouteController.sendRouteInformation(chosenLeastCongestedRouteData)
    if sendLeastCongestedRouteInformation == False or sendLeastCongestedRouteInformation == None:

        logger.debug("Error when retrieving the information of the least congested route. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "backend error"
        }

        return jsonify(returnData), 400
    
    chosenFastestRouteData = PublicTransportRouteController.computeFastestRoute(limitWalkingDistanceData)
    if chosenFastestRouteData == False or chosenFastestRouteData == None:

        logger.debug("Error when retrieving the chosen fastest route. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "backend error"
        }

        return jsonify(returnData), 400

    sendFastestRouteInformation = PublicTransportRouteController.sendRouteInformation(chosenFastestRouteData)
    if sendFastestRouteInformation == False or sendFastestRouteInformation == None:

        logger.debug("Error when retrieving the information of the chosen fastest route. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "backend error"
        }
        
    return jsonify(sendLeastCongestedRouteInformation, sendFastestRouteInformation), 200

@app.route("/CongestionData", methods=["GET", "POST"])
def CongestionData():
    logger.info("Congestion Data accessed. Verifying information provided")

    try:
        data = request.get_json()
        congestionList = PublicTransportRouteController.getCongestionList(data)

        if congestionList == None:
            logger.error("congestionList is None, Rasing Exception")
            raise Exception("congestionList is None, Rasing Exception")

    except Exception as e:
        logger.error(f"Route data was not provided. {e} Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "Route data was not provided"
        }
        return jsonify(returnData), 400
    
    return jsonify(congestionList), 200

if __name__ == "__main__":
    app.run()