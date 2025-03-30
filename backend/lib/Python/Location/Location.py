import requests
import json
import os

from lib.Python.Logging.PythonLogger import PythonLogger

logger = PythonLogger(os.path.basename(__file__))

class Location(): 
    def __init__(self, latitude, longitude):

        self.latitude = latitude
        self.longitude = longitude
        
        return

    def getLantitude(self):
        return self.latitude
    
    def getLongitude(self):
        return self.longitude
    
    def setLocation(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude
