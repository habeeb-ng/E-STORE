import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from './backend/firebase';
import { login } from './features/userSlice';
import { useDispatch } from 'react-redux';
import "./SignIn.css";


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = (eventObj) => {
    eventObj.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user.emailVerified) {
        getDoc(doc(db, "Users", userCredential.user.uid))
        .then((doc) => {
          dispatch(login({
            fullName: doc.data().fullName,
            userId: doc.data().userId,
            email: doc.data().email,
            cart: doc.data().cart, //map the cart into the array
          }))
        })
        .then(() => {
          navigate('/')
          setEmail("")
          setPassword("")
          setErrorMessage('')
          setDisplayMessage('')
        })
      } else {
        console.log(userCredential.user.emailVerified)
        setErrorMessage("Verify your email to sign in")
      }
    })
      .catch(error => setErrorMessage(error.message))
    
    setDisplayMessage('')
  }
  const handleSignOut=() => {
    signOut(auth)
      .then((user) => {
      console.log(user, "signed Out")
    })
  }
  const handleVerify = () => {
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      setDisplayMessage("Email verification sent. Please verify your email and then signIn")
    })
    .then(()=>{setErrorMessage('')})
    .catch((error)=> console.log(error.message) )
  }
  return (

    <div className='SignIn'>
      <h2>Welcome</h2>
      <div className="signIn__container">
        <h3>Login to E-STORE </h3>
        <form onSubmit={handleSignIn} action="">
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Email"  required/>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="password" required />
            <button>Login</button>
            <p>don't have an account? <Link to="signUp">Create An Account</Link></p>
        </form>
        {errorMessage && <div className="ErrorMessage">
          <p>{errorMessage}</p>
          {errorMessage == "Verify your email to sign in" && <button onClick={handleVerify}>verify email now</button>}
        </div>}
        {displayMessage &&
          <div className='displayMessage'><p>{displayMessage}</p></div>
        }
      </div>
          
    </div>
  )
}

export default SignIn;
