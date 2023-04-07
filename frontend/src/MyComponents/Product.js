import React, { useContext } from "react";
import "./Product.css";
import { StateContext } from "../MyContexts/StateProvider.js";
import { Rupee } from '../MyContexts/reducer.js'
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const star="⭐";

export const Product = ({id,title,image,price,rating}) => {

    const[{user},dispatch]=useContext(StateContext);
    const navigate=useNavigate();

    const addToCart=()=>{
        if(user){
            db.collection('users').doc(user.uid).get()
            .then(doc=>{
                let new_basket=doc.data().basket;
                new_basket.push({id,title,image,price,rating});
                dispatch({
                    type:"ADD_TO_BASKET",
                    item:{
                        id,title,image,price,rating
                    }
                })
                db.collection('users').doc(user.uid).set({
                    ...doc.data(),basket:new_basket
                })
            })
        }
        else{
            navigate('/login')
        }
    }

    const priceFormat=Rupee(price);

    return (
        <div className="product">
            <div className="product_info">
                <p className="product_title">{title}</p>
                <p className="product_price">
                    <small>₹</small>
                    <strong>{priceFormat}/-</strong>
                </p>
                <div className="product_rating">
                    {Array(rating).fill().map(()=>(
                        <p>{star}</p>
                    ))}
                </div>

            </div>
            <img src={image} alt="" className="product_image" />
            <button onClick={()=>addToCart()}>Add to Cart</button>
        </div>
    );
};
