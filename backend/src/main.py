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

googleApiKey = getGoogleMapAPIKey(r"A:\Documents\School\SC2006\SC2006\backend\creds\priv\googleMapApi.json")
print(googleApiKey)

@app.route("/heartbeat", methods=["GET", "POST"])
def heartbeat():

    logger.debug("Heartbeat API called")
    return jsonify({"heartbeat" : "ok"}), 200

# Placeholder function without proper class/module structure
@app.route("/getBasicRoute", methods=["GET"])
def getBasicRoute():

    source = request.get_json()["source"]
    destination = request.get_json()["destination"]

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

    response = requests.post(url, json = bodyData, headers = headers)

    responseData = response.json()

    encodedPolyline = responseData["routes"][0]["polyline"]["encodedPolyline"]
    duration = responseData["routes"][0]["duration"]
    distance = responseData["routes"][0]["distanceMeters"]

    returnData = {
        "polyline" : encodedPolyline,
        "duration" : duration,
        "distance" : distance
    }

    return returnData, 200

if __name__ == "__main__":
    app.run()