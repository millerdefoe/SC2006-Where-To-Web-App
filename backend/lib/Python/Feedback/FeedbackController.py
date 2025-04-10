import requests
import json
import os

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Database.Database import Database
from lib.Python.Helper.HelperFunctions import loadDatabaseCredentials

logger = PythonLogger(os.path.basename(__file__))

databaseCredsPath = os.path.join(".", "creds", "priv", "database.json")
databaseCreds = loadDatabaseCredentials(databaseCredsPath)

dbObj = Database(
    databaseCreds["host"],
    databaseCreds["database"],
    databaseCreds["username"],
    databaseCreds["password"],
    databaseCreds["port"]
)

class FeedbackController():

    def __init__():

        return True

    def storeFeedback(feedback):

        feedbackName = feedback["feedbackName"]
        feedbackEmail = feedback["feedbackEmail"]  
        feedbackDescription = feedback["feedbackDescription"]  

        insertStatement = f"""

            INSERT INTO feedbackrecords (feedbackname, feedbackemail, feedbackdescription)
            VALUES (%s,%s,%s)

        """

        values = (feedbackName, feedbackEmail, feedbackDescription)

        if dbObj.writeData(insertStatement, values) == True:
            logger.info("Successfully stored feedback in database with statement {} and values {}".format(insertStatement, values)) 

            return True

        if dbObj.writeData(insertStatement, values) == False:
            logger.error("Error inserting feedback data with statement {} and values {}".format(insertStatement, values))    

            return False 


