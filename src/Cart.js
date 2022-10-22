import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartProduct from './CartProduct';
import './Cart.css'
import { useNavigate } from 'react-router-dom';

function Cart() {
  const carts = useSelector(state => state.cart.cart);
  const [total, setTotal] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate()

  const sumQunatity = (cart) => {
    const cartQautity = cart.map(product => product.quantity);
    const sumQuantity = cartQautity.reduce((x, y) => x + y);
    return sumQuantity;
  }
  const sumTotal = (cart) => {
    const prices = cart.map(product => product.productTotal);
    const priceTotal = prices.reduce((total, price) => total + price);
    return priceTotal;
  }
  useEffect(() => {
    if (carts.length) {
      setQuantity(sumQunatity(carts));
      setTotal(sumTotal(carts))
    } else {
      setQuantity(0)
      setTotal(0)
    }
  }, [carts])
  return (
    <div className="Cart">
      
      <h1>Shopping Cart</h1>
      <div className="cart__container">
        <div className="cart__summary">
          <h2>Subtotal ({quantity} items): <span>${total}</span> </h2>
          <button>Proceed to checkout</button>
        </div>
      
        <div className="cart__content"> 
          {carts.map((product) => {
            return (
                <CartProduct
                  id={product.id}
                  image={product.thumbnail}
                  title={product.title}
                  price={product.price}
                quantity={product.quantity}
                description={product.description}
                />)
          })}
        </div>
        {!user && 
          <div className="unSigned">
            <button onClick={() => {navigate("/signIn")}}> sign in to you account</button>
            <button onClick={()=>{navigate("/signIn/signUp")}}>sign up now</button>
          </div>}
      </div>
      
      
    </div>
  )
}

export default Cart;