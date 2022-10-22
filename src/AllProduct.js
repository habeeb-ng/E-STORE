import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Product from './Product';
import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from './backend/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  increment
} from 'firebase/firestore';
import { defaultCartState, firstCall, updateCart } from "./features/cartSlice"
import handleAddToCart from './handleAddToCart';

function AllProduct({ products }) {
  const user = useSelector(state => state.user.user);
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user)
  // console.log(cart)
  // const cartColRef = collection(db, "Users", user.userId, "userCart");
  // console.log(user.userId);
  // console.log(products);
  useEffect(() => {
    if (user) {
      const cartColRef = collection(db, "Users", user.userId, "userCart");
      const q = query(cartColRef, orderBy("timestamp", "desc"));
      onSnapshot(q,(snapshot) => {
        const cart=[];
        snapshot.docs.forEach((doc)=>{
          cart.push(doc.data())
        })
        // console.log(cart)
      dispatch(firstCall(cart));
      
      })
    }
    else {
      dispatch(defaultCartState())
    }
  },[user])


  
    
  return (
    <div className="allProducts">
      <div className="first">
        {products.slice(0,4).map((prod) => {
        return (
          <div className="products" key ={prod.id}>
                    <Product
                        id={prod.id}
                        title={prod.title}
                        price={prod.price}
                        image={prod.thumbnail}
                        rating={prod.rating}
                />
            <button onClick={() => { handleAddToCart(prod, user, dispatch, navigate) }}>Add to cart</button>
          </div>
        )
      })}
      </div>
      
      <div className="ads__1">
        <h2>Best deal on Tech Accessories</h2>
        
      </div>
      <div className="products__container">
        {products.slice(5,19).map((prod) => {
        return (
          <div className="products" key ={prod.id}>
                    <Product
                        id={prod.id}
                        title={prod.title}
                        price={prod.price}
                        image={prod.thumbnail}
                        rating={prod.rating}
                />
            <button onClick={() => { handleAddToCart(prod, user, dispatch, navigate) }}>Add to cart</button>
          </div>
        )
      })}
      </div>
      
      <div className="ads__2">
        <h2>Self care in one click</h2>
      </div>
      <div className="products__container">
        {products.slice(20,products.length).map((prod) => {
        return (
          <div className="products" key ={prod.id}>
                    <Product
                        id={prod.id}
                        title={prod.title}
                        price={prod.price}
                        image={prod.thumbnail}
                        rating={prod.rating}
                />
            <button onClick={() => { handleAddToCart(prod, user, dispatch, navigate) }}>Add to cart</button>
          </div>
        )
      })}
      </div>
      
    </div>
  )
}

export default AllProduct;