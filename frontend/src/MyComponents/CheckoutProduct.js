import React, { useContext } from 'react'
import './CheckoutProduct.css'
import { StateContext } from '../MyContexts/StateProvider'
import { db } from '../firebase';

export const CheckoutProduct = ({id,title,image,price,rating,hideButton}) => {

    const [{user},dispatch]=useContext(StateContext);
    const removeFromBasket=()=>{
        db.collection('users').doc(user.uid).get()
        .then(doc=>{
            let basket=doc.data().basket;
            let index=0;
            for(;index<basket?.length;index++){
                if(basket[index].id===id){
                    break;
                }
            }
            basket.splice(index,1);
            db.collection('users').doc(user.uid).set({
                ...doc.data(),basket
            })
        })
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id,
        })
    }

  return (
    <div className="checkoutProduct">
        <img src={image} alt="" className="checkoutProduct_image" />
        <div className="checkoutProduct_info">
            <p className="checkoutProduct_title">{title}</p>
            <p className="checkoutProduct_price">
                <small>₹</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct_rating">
                {Array(rating).fill().map(()=>(
                    <p>⭐</p>
                ))}
            </div>
            {!hideButton && (
                <button onClick={()=>removeFromBasket()}>Remove from Cart</button>
            )}
        </div>
    </div>
  )
}
