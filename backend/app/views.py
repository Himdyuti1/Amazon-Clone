from app import app
from flask import request,send_from_directory
import stripe
from flask_cors import cross_origin

@app.route('/payments/create',methods=['POST'])
@cross_origin()
def home():

    amount=request.args['total']
    amount=int(amount)
    intent=stripe.PaymentIntent.create(
        amount=amount,
        currency='INR',
        payment_method_types=['card']
    )

    return intent,200

@app.route('/')
@cross_origin()
def hello():
    return "Amazon-Clone-API"