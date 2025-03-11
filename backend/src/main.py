from flask import Flask
from flask import jsonify
from flask_cors import CORS

import json

from lib.Python.Logging.PythonLogger import PythonLogger

logger = PythonLogger(os.path.basename(__file__))

app = Flask(__name__)
CORS(app)

@app.route("/heartbeat", methods=["GET", "POST"])
def heartbeat():

    logger.debug("Heartbeat API called")
    return jsonify({"heartbeat" : "ok"}), 200

if __name__ == "__main__":
    app.run()