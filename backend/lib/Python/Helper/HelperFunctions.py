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
                return f.load(filePath)

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
                "username" := os.getenv("DB_NAME"),
                "password" := os.getenv("DB_NAME")
            }

            return credentials
        
        except Exception as e:
            logger.error(e)
            logger.info(traceback.print_exc())
            return False