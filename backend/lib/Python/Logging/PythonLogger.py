import logging

class PythonLogger(logging.Logger):

    def __init__(self, loggerName, fileName = None, level = logging.INFO):

        super().__init__(loggerName, level)
        self.fileName = fileName
        self.f_handler = None
        self.streamHandle = logging.StreamHandler()
        self.formatter = logging.Formatter('[%(asctime)s][%(name)s - %(funcName)s - %(lineno)d]%(levelname)s: %(message)s ')
        self.streamHandle.setFormatter(self.formatter)
        self.streamHandle.setLevel(logging.INFO)

        if fileName:
            self.f_handler = logging.FileHandler(fileName)
            self.f_handler.setFormatter(self.formatter)
            self.f_handler.setLevel(logging.INFO)
            self.addHandler(self.f_handler)

        self.addHandler(self.streamHandle)

    def setLoggingLevel(self, level):

        if level == "DEBUG":
            self.streamHandle.setLevel(logging.DEBUG)

        if level == "INFO":
            self.streamHandle.setLevel(logging.INFO)
        
        if level == "WARNING":
            self.streamHandle.setLevel(logging.WARNING)

        if level == "ERROR":
            self.streamHandle.setLevel(logging.ERROR)
        
        if level == "CRITICAL":
            self.streamHandle.setLevel(logging.CRITICAL)
        
        self.handlers = []
        self.addHandler(self.streamHandle)
        if self.fileName:
            self.f_handler = logging.FileHandler(self.fileName)
            self.f_handler.setFormatter(self.formatter)
            self.f_handler.setLevel(logging.INFO)
            self.addHandler(self.f_handler)
        
    def removeStreamLogger(self):

        if self.f_handler == None:
            self.error("File logger is not available. Unable to disable stream loggin")
            return False

        self.handlers = []

        self.addHandler(self.f_handler)
        
        return True
    
    def addFileHandler(self, fileName):

        self.fileName = fileName
        self.f_handler = logging.FileHandler(fileName)
        self.f_handler.setFormatter(self.formatter)
        self.f_handler.setLevel(logging.INFO)
        self.addHandler(self.f_handler)