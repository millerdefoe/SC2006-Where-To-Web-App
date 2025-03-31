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

    result = userController.createUser(username, password, dbObj)

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

        loger.debug("Password mismatch when logging in")

        returnData = {
            "status" : "login failure",
            "reason" : "password mismatch"
        }

        return jsonify(returnData), 400

    returnData = {
        "status" : "login success",
        "userid" : userid,
        "token" : "temporarytokenfortesting"
    }

    logger.info("Login for user {} was successful. Returning userid and token")
    return jsonify(returnData), 200

@app.route("/carparksNearby", methods=["GET"])
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

@app.route("/PublicTransportRoute", methods=["GET"])
def PublicTransportRoute():
    logger.info("Public Transport Route accessed. Verifying information provided")
    try:
        data = request.get_json()
        if "currentLocation" not in data.keys() or "destinationLocation" not in data.keys():
            logger.error("Rasing Exception")
            raise Exception

        # latitude = float(data["latitude"])
        # longitude = float(data["longitude"])

        currentLocation = Location(data["currentLocation"]["latitude"],data["currentLocation"]["longitude"])
        destinationLocation = Location(data["destinationLocation"]["latitude"],data["destinationLocation"]["longitude"])
        maxWalkingDistance = data["maxWalkingDistance"]

    except ValueError:

        logger.error("Coordinate information provided was not a number. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "Coordinate information was not a number"
        }

        return jsonify(returnData), 400

    except Exception as e:

        logger.error(f"Coordinate information was not provided. {e} Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "Coordinate information was not provided"
        }

        return jsonify(returnData), 400

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
    
    chosenRouteData = PublicTransportRouteController.computeLeastCongestedRoute(limitWalkingDistanceData)

    if chosenRouteData == False:

        logger.debug("Error when retrieving the chosen route. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "backend error"
        }

        return jsonify(returnData), 400
    
    chosenRoutePolylineData = PublicTransportRouteController.getPolylineFromRoute(chosenRouteData)
    if chosenRoutePolylineData == False or chosenRoutePolylineData == None:

        logger.debug("Error when retrieving the polyline of the chosen route. Returning error 400")
        returnData = {
            "status" : "failure",
            "reason" : "backend error"
        }

        return jsonify(returnData), 400

    return jsonify(chosenRoutePolylineData), 200

if __name__ == "__main__":
    app.run()