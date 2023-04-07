import React, { useState,useContext } from 'react';
import './Orders.css';
import { useEffect } from 'react';
import { db } from '../firebase';
import { StateContext } from '../MyContexts/StateProvider';
import { Order } from './Order.js';

export const Orders = () => {

  const [{basket,user},dispatch]=useContext(StateContext);
  const [orders,setOrders]=useState([]);

  useEffect(()=>{
    if(user){
      db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .orderBy('created','desc')
      .onSnapshot(snapshot=>(
        setOrders(snapshot.docs.map(doc=>({
          id:doc.id,
          data:doc.data()
        })))
      ))
    }
    else{
      setOrders([]);
    }
    console.log(orders);
  },[user])

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders_order">
        {orders?.map(order=>(
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}
