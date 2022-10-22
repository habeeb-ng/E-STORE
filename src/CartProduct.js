import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {db} from "./backend/firebase"

function CartProduct({ id, image, title, price, quantity,description }) {
  const user = useSelector(state => state.user.user);
  const cart = useSelector(state => state.cart.cart);
  const productRef = doc(db, "Users", user.userId, "userCart", `${id}`);
  const [manualSelect, setManualSelect] = useState(false);
  const [quantityInput, setQuantityInput] = useState(quantity);

  const handleManualQunatity = (e) => {
    e.preventDefault();
    updateDoc(productRef,
    {
      quantity: Number(quantityInput),
      productTotal: Number(quantityInput) * price,
      })
    .then(setManualSelect(false))
  }
  
  useEffect(() => {
    
  },[cart])
  const handleDeleteFromCart = ()=> {
    //delete the product from the cart
    deleteDoc(productRef)
      .then(() => {
        console.log("product deleted");
    })
  }
  
  
  return (
    <div className="CartProduct">
      
        <div className="cartProduct__image">
          <Link to={`/product/${id}`}>
            <img width="100%" src={image}  alt={title} />
          </Link>
        </div>
      <div className="cartProduct__detail">
        
          <h4>{title}</h4>
          <h3>${price}</h3>
          <p>{description}</p>
        {/* use the select to change the quantity of the product */}
        <form action="" onSubmit={handleManualQunatity}>
          <label>Qty</label>
          {!manualSelect && <select
          value={quantity}
            onChange={(e) => {
                if (e.target.value > 9) {
                 setManualSelect(true)
                } else {
                  updateDoc(productRef,
                  {
                    quantity: Number(e.target.value),
                    productTotal: Number(e.target.value) * price,
                  })
                }
                
              }
            }
        >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10+</option>
        </select>}
        {/* use the delete button to delete the product from the cart. */}
          
          {/* add another feature that lets user manually input quantity
          and also check if the qauntity is greater thean the stock of the product */}
          {manualSelect && <input value={quantityInput} onChange={(e) => setQuantityInput(e.target.value)} type="number"/>}
        </form>
        <button onClick={handleDeleteFromCart}>Delete</button>
        </div>
      
        
    </div>
  )
}

export default CartProduct
