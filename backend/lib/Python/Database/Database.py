import re
import json
import os
from datetime import datetime
from datetime import timedelta
import argparse
from pathlib import Path
import traceback

import psycopg2

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Helpers.AddExceptions import WrongValue
import logging

logger = PythonLogger(os.path.basename(__file__), level=logging.DEBUG)

class Database():

    def __init__(self, host, db, username, password, port = 5432):

        try:
            self.conn = psycopg2.connect(
                host = host,
                database = db,
                user = username,
                password = password,
                port = port
            )

            self.host = host
            self.database = db
            self.user = username
            self.password = password
            self.port = port

            self.cursor = self.conn.cursor()

            logger.info("Succesfully connected to database")

        except (Exception, psycopg2.DatabaseError) as error:
            logger.error(error)
            logger.info(traceback.print_exc())

    def readData(self, readStatement):

        logger.info("Selecting information from database with given string")
        logger.info("Given string = {}".format(readStatement))

        try:
            self.cursor.execute(readStatement)
            data = self.cursor.fetchall()

            return data
        except Exception as e:
            self.reconnectDb()
            logger.error("Error when reading data: {}".format(e))
            logger.info(traceback.format_exc())
            return False

    def writeData(self, writeStatement, data = None):

        logger.info("Writing information from database with given string")
        logger.info("Given string = {}".format(writeStatement))
        logger.info("Given data = {}".format(data))
        try:
            self.cursor.execute(writeStatement, data)
            self.conn.commit()

            return True

        except Exception as e:
            self.reconnectDb()
            logger.error("Error when inserting data: {}".format(e))
            logger.info(traceback.format_exc())
            return False

    def reconnectDb(self):

        self.cursor.close()
        self.conn.close()

        self.conn = psycopg2.connect(
                host = self.host,
                database = self.database,
                user = self.user,
                password = self.password,
                port = self.port
            )

        self.cursor = self.conn.cursor()
        logger.info("Succesfully reconnected database object")

        return True

    def __del__(self):

        logger.debug("Killing database object")
        self.cursor.close()
        self.conn.close()
