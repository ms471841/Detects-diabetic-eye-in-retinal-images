import io
import json
import os
import sys

# Flask
from flask import (
    Flask,
    redirect,
    url_for,
    request,
    render_template,
    Response,
    jsonify,
    redirect,
)
import requests
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer
from flask_cors import CORS

# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

# Preprocessing utilities
from tensorflow.keras.applications.imagenet_utils import (
    preprocess_input,
    decode_predictions,
)
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Model building
from keras import layers
from keras.optimizers import Adam
from keras.models import Sequential
from keras.applications import DenseNet121
from keras.callbacks import Callback, ModelCheckpoint


from PIL import Image
from models.model import build_model, preprocess_image

# Some utilites
import numpy as np
from utils import base64_to_pil
from requests.structures import CaseInsensitiveDict


# Creating a new Flask Web application.
app = Flask(__name__)
cors = CORS(
    app,
    origins=[
        "http://localhost:3000",
    ],
)

# Model saved with Keras model.save()
MODEL_PATH = "./models/pretrained/model.h5"

# Loading trained model
model = build_model()
model.load_weights(MODEL_PATH)
print("Model loaded. Start serving...")


def model_predict(img, model):
    """
    Classify the severity of DR of image using pre-trained CNN model.

    Keyword arguments:
    img -- the retinal image to be classified
    model -- the pretrained CNN model used for prediction

    Predicted rating of severity of diabetic retinopathy on a scale of 0 to 4:

    0 - No DR
    1 - Mild
    2 - Moderate
    3 - Severe
    4 - Proliferative DR

    """

    ## Preprocessing the image
    x_val = np.empty((1, 224, 224, 3), dtype=np.uint8)
    img = img.resize((224,) * 2, resample=Image.LANCZOS)
    x_val[0, :, :, :] = img

    preds = model.predict(x_val)
    return preds


@app.route("/", methods=["GET"])
def index():
    # Main page
    return render_template("index.html")


@app.route("/api/v1/predict", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        # Get the image from post request
        # img = base64_to_pil(request.json)

        # Save the image to ./uploads
        # img.save("./uploads/image.png")

        # Make prediction on the image

        # by me
        image_file = request.files["file"]
        image_bytes = io.BytesIO(image_file.read())
        img = Image.open(image_bytes)

        # end of by me
        preds = model_predict(img, model)

        # Process result to find probability and class of prediction
        pred_proba = "{:.3f}".format(np.amax(preds))  # Max probability
        pred_class = np.argmax(np.squeeze(preds))

        diagnosis = ["No DR", "Mild", "Moderate", "Severe", "Proliferative DR"]

        result = diagnosis[pred_class]  # Convert to string

        # Serialize the result
        # url = "http://localhost:4000/uploadimage"
        # create FormData object and add the image file
        # form_data = CaseInsensitiveDict()
        # form_data["image"] = image_file
        # form_data.add("result", result)
        # form_data.add("probability", pred_proba)

        # response = requests.post(url, form_data)
        # print(response)
        return jsonify(result=result, probability=pred_proba)

    return None


if __name__ == "__main__":
    # app.run(port=5002, threaded=False)

    # Serve the app with gevent
    http_server = WSGIServer(("0.0.0.0", 5000), app)
    http_server.serve_forever()


# define the error handling middleware
@app.errorhandler(Exception)
def handle_error(error):
    response = jsonify({"error": str(error)})
    response.status_code = 500
    return response
