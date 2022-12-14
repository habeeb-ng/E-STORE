
// import { Counter } from './features/counter/Counter';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import NavBar from './NavBar';
import Header from './Header';
import { useEffect, useState } from 'react';
import useFetchProduct from './useFetchProduct';
import Profile from './Profile';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Filtered from './Filtered';
import Filters from "./search"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./backend/firebase"
import { login, logout} from "./features/userSlice"
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [searchProducts, setSearchProducts] = useState()
  const { data: products } = useFetchProduct("https://dummyjson.com/products");
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user status changed", user);
      if (user) {
        getDoc(doc(db, "Users", user.uid))
        .then((doc) => {
          dispatch(login({
            fullName: doc.data().fullName,
            userId: doc.data().userId,
            email: doc.data().email,
            cart: doc.data().cart, //map the cart into the array
          }))
        })
      } else {
        dispatch(logout())
      }
    })
  },[])
  
  return (
    <Router>
      <div className="App">
        {/* <Nav /> */}
        <Header  setSearch ={setSearchProducts} />
        
        <div className="app-content">
          <Routes> 
            <Route path="/" element={<Home products={products} />}
            />
            <Route path="/filterd" element={<Filtered products={products} searchKey={searchProducts} />}/>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail/>}/> {/*:id can be used to access a particular id of a product */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} /> {/*users should signout from their profile page */}
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signIn/signUp" element={<SignUp/>}/> {/* when you routing within a component, you have to put the the path you are routing from to before the one you are routine to  */}
          </Routes>
        </div>
    </div>
    </Router>
  );
}

export default App;
