from flask import Flask
from flask import jsonify
from flask_cors import CORS
from flask import request

import json
import os

import requests

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Helper.HelperFunctions import getGoogleMapAPIKey

logger = PythonLogger(os.path.basename(__file__))

app = Flask(__name__)
CORS(app)

googleApiKey = getGoogleMapAPIKey(r".\creds\priv\googleMapApi.json")

@app.route("/heartbeat", methods=["GET", "POST"])
def heartbeat():

    logger.debug("Heartbeat API called")
    return jsonify({"heartbeat" : "ok"}), 200

# Placeholder function without proper class/module structure
@app.route("/getBasicRoute", methods=["GET"])
def getBasicRoute():

    logger.info("Getting route directly from google map API")
    source = request.get_json()["source"]
    destination = request.get_json()["destination"]

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

    response = requests.post(url, json = bodyData, headers = headers)

    logger.debug("Response received. Decoding google map api response into dictionary for parsing")

    responseData = response.json()

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

if __name__ == "__main__":
    app.run()