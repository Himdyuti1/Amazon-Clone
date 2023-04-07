from flask import Flask
import stripe
from flask_cors import CORS

stripe.api_key='sk_test_51MsniYSBA700P73myF96jH1Y6e0rwErO33BJC1r0nSNGyUcYSGaHdhVVkbUqrS5k35fL4x4l4zEp8FEI2hf6pRLR00N6Lnh9JZ'

app=Flask(__name__)
CORS(app)

from app import views
