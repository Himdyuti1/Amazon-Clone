import React, { useState } from 'react'
import './Order.css';
import moment from 'moment';
import { CheckoutProduct } from './CheckoutProduct';
import { Rupee } from '../MyContexts/reducer';

export const Order = ({order}) => {
  return (
    <div className="order">
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format("MMMM Dd YYYY, h:mma")}</p>
        <p className="order_id">
            <small>Order ID: {order.id}</small>
        </p>
        {order.data.basket.map(item=>(
            <CheckoutProduct
                id={item.id}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton
            />
        ))}
        <h3 className='order_total'>Order Total:₹{Rupee(order.data.amount/100)}</h3>
    </div>
  )
}
