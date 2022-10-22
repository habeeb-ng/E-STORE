import {
    collection,
    doc,
    getDoc,
    increment,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc
} from "firebase/firestore";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Product from './Product';
import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from './backend/firebase';
import { defaultCartState, firstCall, updateCart } from "./features/cartSlice"

const handleAddToCart = (thisProduct, user, dispatch, navigate) => {
    
    
    if (user) {
      const cartColRef = collection(db, "Users", user.userId, "userCart");
      const createColRef = doc(db, "Users", user.userId, "userCart", `${thisProduct.id}`);
      const q = query(cartColRef, orderBy("timestamp", "desc"));
      getDoc(createColRef)
        .then((doc) => {
          if (doc.exists()) {
            updateDoc(createColRef, {
              quantity: increment(1),
              productTotal: increment(thisProduct.price)
            })
            console.log(doc.data().quantity)
          } else{
            setDoc(createColRef, {
              ...thisProduct,
              timestamp: serverTimestamp(),
              quantity: 1,
              productTotal: thisProduct.price
            })
            .catch((err)=>{
              console.log(err)
            })
          }
        
        });
      
        
              // else if (!createColRef) {

        
      // }
      

      
    } else {
      navigate('/signIn');
    }
    
}
export default handleAddToCart;