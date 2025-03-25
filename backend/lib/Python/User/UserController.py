import requests
import json

import os

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Helper.HelperFunctions import loadDatabaseCredentials
from lib.Python.Database.Database import Database

logger = PythonLogger(os.path.basename(__file__))

class UserController():

    def __init__(self):

        return

    def checkUsernameTaken(self, username: str, dbObj):

        logger.info("Checking for existing username {}".format(username))
        queryStatement = "SELECT * FROM users WHERE username = '{}'".format(username)

        data = dbObj.readData(queryStatement)

        if data != []:

            logger.info("Username {} is taken".format(username))
            return 0

        else:
            logger.info("Username {} is not taken".format(username))
            return 1

    def createUser(self, username: str, password: str, dbObj):

        logger.info("Creating new user with username {}".format(username))

        insertStatement = "INSERT INTO users(username, password) VALUES (%s, %s)"
        values = [username, password]

        if dbObj.writeData(insertStatement, values) == False:
            logger.error("Unable to create user with username: {}".format(username))
            logger.info("Insert string: {} ||| Values: {}".format(insertStatement, values))
            return False
        
        logger.info("Successfully created new user with username: {}".format(username))

        userid = self.findUserId(username, dbObj)

        logger.info("Returning userid: {} of new user {}".format(userid, username))

        return userid

    def loginUser(self, username: str, password: str, dbObj):

        logger.info("Verifying credentials for username {}".format(username))
        queryStatement = "SELECT password, userid FROM users WHERE username = '{}'".format(username)

        data = dbObj.readData(queryStatement)

        if data == []:

            logger.info("Username {} does not exist".format(username))
            return -1, None

        else:
            userPass = data[0][0]
            if userPass == password:
                logger.info("Password for user {} matches".format(username))
                return 1, data[0][1]

            else:
                logger.info("Password for user {} does not match".format(username))
                return 0, None

    def findUserId(self, username: str, dbObj):

        queryStatement = "SELECT userid FROM users WHERE username = '{}'".format(username)

        logger.info("Finding userid for username {}".format(username))
        data = dbObj.readData(queryStatement)

        if data == []:
            logger.info("Username {} does not exist".format(username))
            return 0

        else:
            userId = data[0][0]
            logger.info("Returning userid for user {}".format(username))
            return userId


# databaseCredsPath = os.path.join(".", "creds", "priv", "database.json")
# databaseCreds = loadDatabaseCredentials(databaseCredsPath)

# dbObj = Database(
#     databaseCreds["host"],
#     databaseCreds["database"],
#     databaseCreds["username"],
#     databaseCreds["password"],
#     databaseCreds["port"]
# )

# obj = UserController()

# obj.loginUser("user1", "password", dbObj)