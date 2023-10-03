import React, { useContext,useState } from 'react';
import './Payment.css';
import { StateContext } from '../MyContexts/StateProvider';
import { CheckoutProduct } from './CheckoutProduct';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal, Rupee } from '../MyContexts/reducer'
import { useEffect } from 'react';
import instance from '../axios';
import { db } from '../firebase';

export const Payment = () => {

    const[{basket,user,name},dispatch]=useContext(StateContext);
    const navigate=useNavigate()

    const value = getBasketTotal(basket);
    const valueString = Rupee(value);

    const stripe=useStripe();
    const elements=useElements();

    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [clientSecret,setClientSecret]=useState("");

    useEffect(()=>{
        const getClientSecret=async()=>{
            const response=await instance.post(`/payments/create?total=${value*100}`);
            setClientSecret(response.data.client_secret);
        }
        getClientSecret();
    },[basket])

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{

            db.collection('users').doc(user.uid).collection('orders').doc(paymentIntent.id).set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            }).then(()=>{
                setSucceeded(true);
                setError(null);
                setProcessing(false);
                dispatch({
                    type:"EMPTY_BASKET"
                })
                db.collection('users').doc(user.uid).get()
                .then((doc)=>{
                    db.collection('users').doc(user.uid).set({
                        ...doc.data(),basket:[]
                    })
                    .then(()=>{
                        navigate('/orders',{replace:false});
                    })
                })
            })
        })     
    }

    const handleChange=(e)=>{
        setDisabled(e.empty);
        setError(e.error?e.error.message:"");
    }

  return (
    <div className="payment">
        <div className="payment_container">
            <h1>Checkout(
                <Link to='/checkout'>{basket?.length} items</Link>    
            )</h1>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_address">
                    <p>{name}</p>
                    <p>azad</p>
                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment_items">
                    {basket.map(item=>(
                        <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                    <form action="" onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment_priceContainer">
                            <p>
                                Order Total:
                                <strong>₹{valueString}</strong>
                            </p>
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing?<p>Processing</p>:
                                "Buy Now"}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
