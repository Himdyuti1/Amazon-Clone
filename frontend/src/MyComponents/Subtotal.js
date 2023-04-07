import React, { useContext } from 'react'
import './Subtotal.css'
import { StateContext } from '../MyContexts/StateProvider.js'
import { getBasketTotal, Rupee } from '../MyContexts/reducer'
import { useNavigate } from 'react-router-dom'

export const Subtotal = () => {

  const navigate=useNavigate();

  const [{ basket }, dispatch] = useContext(StateContext);
  const value = getBasketTotal(basket);
  const valueString = Rupee(value);

  return (
    <div className="subtotal">
      <p>
        Subtotal({basket?.length} items):
        <strong>₹{valueString}</strong>
      </p>
      <small className="subtotal_gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <button onClick={e=>navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}
