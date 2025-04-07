import requests
import json

import os

from lib.Python.Logging.PythonLogger import PythonLogger

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

    def createUser(self, username: str, password: str, rfid: str, dbObj):

        logger.info("Creating new user with username {}".format(username))

        insertStatement = "INSERT INTO users(username, password" 
        
        if rfid:
            insertStatement += ", rfid) VALUES (%s, %s, %s)"
            values = [username, password, rfid]

        else:
            insertStatement += ") VALUES (%s, %s)"
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
    
    def editUserDetails(self, username: str, password: str, rfid: str, dbObj):

        logger.info("Editing user details for {}".format(username))

        insertStatement = "UPDATE users set "

        if password and rfid:

            insertStatement += "password = %s, rfid = %s "
            values = [password, rfid]

        if password:

            insertStatement += "password = %s "
            values = [password]

        if rfid:

            insertStatement += "rfid = %s "
            values = [rfid]

        userid = self.findUserId(username, dbObj)

        insertStatement += "WHERE userid = {}".format(userid)

        if dbObj.writeData(insertStatement, values) == False:
            logger.error("Unable to edit user details with username: {}".format(username))
            logger.info("Insert string: {} ||| Values: {}".format(insertStatement, values))
            return False
        
        logger.info("Successfully edited user details for user: {}".format(username))

        logger.info("Returning userid: {} of user {}".format(userid, username))

        return userid
