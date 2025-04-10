import requests
import json
import os
import re

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
    
    #Used to validate if the email field is properly inputted
    def is_valid_email(email):
        pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(pattern, email) is not None

    def storeFeedback(feedback):

        feedbackName = feedback["feedbackName"]
        feedbackEmail = feedback["feedbackEmail"]  

        if FeedbackController.is_valid_email(feedbackEmail):
            logger.info(f"{feedbackEmail} is a valid email.")
        else:
            logger.error(f"{feedbackEmail} is not a valid email.")
            return False


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


