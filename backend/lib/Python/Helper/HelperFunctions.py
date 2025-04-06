import json
import traceback
import os

from lib.Python.Logging.PythonLogger import PythonLogger

logger = PythonLogger(os.path.basename(__file__))

def loadDatabaseCredentials(filePath = None):

    if filePath != None:
        logger.info("Retrieving database credentials using filepath")
        try:
            with open(filePath, "r") as f:
                return json.load(f)

        except FileNotFoundError:
            logger.error("File {} does not exist".format(filePath))
            return False

        except Exception as e:
            logger.error(e)
            logger.info(traceback.print_exc())
            return False

    else:
        logger.info("Retrieving database credentials from environment variables")
        try:
            credentials = {
                "host" : os.getenv("DB_USER"),
                "database" : os.getenv("DB_PASSWORD"),
                "port" : os.getenv("DB_HOST"),
                "username" : os.getenv("DB_NAME"),
                "password" : os.getenv("DB_NAME")
            }

            return credentials
        
        except Exception as e:
            logger.error(e)
            logger.info(traceback.print_exc())
            return False

def getGoogleMapAPIKey(filePath = None):

    if filePath != None:
        logger.info("Retrieving google API key using filepath")
        try:
            with open(filePath, "r") as f:
                return json.load(f)["google-api-key"]

        except FileNotFoundError:
            logger.error("File {} does not exist".format(filePath))
            return False

        except Exception as e:
            logger.error(e)
            logger.info(traceback.print_exc())
            return False

    else:
        logger.info("Retrieving google API key from environment variables")
        try:
            apiKey = os.getenv("google-api-key")

            return apiKey
        
        except Exception as e:
            logger.error(e)
            logger.info(traceback.print_exc())
            return False

def getLtaAPIKey(filePath = None):

    if filePath != None:
        logger.info("Retrieving LTA API key using filepath")
        try:
            with open(filePath, "r") as f:
                return json.load(f)["lta-api-key"]

        except FileNotFoundError:
            logger.error("File {} does not exist".format(filePath))
            return False

        except Exception as e:
            logger.error(e)
            logger.info(traceback.print_exc())
            return False

    else:
        logger.info("Retrieving LTA API key from environment variables")
        try:
            apiKey = os.getenv("lta-api-key")

            return apiKey
        
        except Exception as e:
            logger.error(e)
            logger.info(traceback.print_exc())
            return False
        
def getPCDAPIKey(filePath = None):

    if filePath != None:
        logger.info("Retrieving PCD API key using filepath")
        try:
            with open(filePath, "r") as f:
                return json.load(f)["lta-api-key"]

        except FileNotFoundError:
            logger.error("File {} does not exist".format(filePath))
            return False

        except Exception as e:
            logger.error(e)
            logger.info(traceback.print_exc())
            return False

    else:
        logger.info("Retrieving PCD API key from environment variables")
        try:
            apiKey = os.getenv("pcd-api-key")

            return apiKey
        
        except Exception as e:
            logger.error(e)
            logger.info(traceback.print_exc())
            return False

def compareGoogleAPITimings(timeOne, timeTwo):

    timeOneInt = int(timeOne[:-1])
    timeTwoInt = int(timeTwo[:-1])

    if timeOneInt < timeTwoInt:
        return True

    return False