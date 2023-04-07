import React, { useContext } from 'react'
import './Checkout.css'
import { Subtotal } from './Subtotal.js'
import { CheckoutProduct } from './CheckoutProduct.js'
import { StateContext } from '../MyContexts/StateProvider'

export const Checkout = () => {

  const [{basket,user},dispatch]=useContext(StateContext);

  return (
    <div className="checkout">
        <div className="checkout_left">
            <h2 className="checkout_title">Your Shopping Basket</h2>
            {basket?.map(item=>(
              <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
        </div>
        <div className="checkout_right">
            <Subtotal />
        </div>
    </div>
  )
}