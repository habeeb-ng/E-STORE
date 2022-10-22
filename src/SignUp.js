import { Password } from '@mui/icons-material';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db, userColRef } from "./backend/firebase";
import { useDispatch, useSelector } from 'react-redux'
import {login} from "./features/userSlice"
import { addDoc, doc, getDoc, getDocs , setDoc, serverTimestamp} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css"
import { isProfiler } from 'react-is';
import "./SignIn.css"
function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate()
    // console.log(user);
  // console.log(auth.currentUser);
  const verifyPassword = (password) => {
    const pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
    if (password == comfirmPassword && password.match(pwFormat)) {
      return true
    } else {
      if (password != comfirmPassword) {
        setErrorMessage("password does not match")
      }
      if (!password.match(pwFormat)) {
        setErrorMessage("Password must contain atleast one Uppercase Letter, one lowecase letter, a number, and must be within 8 to 15 characters")
      }
      
      return false;
    }
  }

  const handleSignUp = (eventObj) => {
    eventObj.preventDefault();

    //create password complexity
   
    
    verifyPassword(password) && createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("user created", userCredential.user.uid)
        updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`
        })
        .then(() => {
          // console.log(auth.currentUser.displayName)
          setDoc(doc(db, "Users", auth.currentUser.uid), {
            fullName: userCredential.user.displayName,
            userId: userCredential.user.uid,
            email: userCredential.user.email,
            timestamp: serverTimestamp(),
          })
          .catch((err) => {throw(err)})
        })
        .then(()=>{
          sendEmailVerification(auth.currentUser)
          .then(()=> alert("email sent"))
        })
        .then(() => {
          getDoc(doc(db, "Users", userCredential.user.uid))
            .then((doc) => {
              console.log(doc.data(), doc.id)
              dispatch(login({
                fullName: doc.data().fullName,
                userId: doc.data().userId,
                email: doc.data().email,
                timestamp: doc.data().timestamp,
              }))
            })
          .catch((err) =>{ throw(err)})
        }) 
    })
    .then(() => {
      navigate("/");
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setComfirmPassword("")
      navigate("/");
      setErrorMessage('')
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })
  }
  // useEffect(() => {
  //   errorMessage && alert(errorMessage)
  //   setErrorMessage(null)
  // },[errorMessage])
  return (
    <div className='signUp'>
      <h2>Welcome</h2>
      <div className="signUp__container">
        <h3>Create an E-STORE account</h3>
        <form onSubmit={handleSignUp}>
              <input value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} type="text" placeholder="First Name" required /> 
              <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" placeholder="Last Name" required /> 
              <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Email" required /> 

              <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password"  required/>
              <input value={comfirmPassword} onChange={(e)=>{setComfirmPassword(e.target.value)}} type="password" placeholder="Comfirm Password" required/>
              
              <button type='submit'>SignUp</button>
        </form>
        {errorMessage && <div className="ErrorMessage">
          <p>{errorMessage}</p>
        </div>}
      </div>
        
    </div>
  )
}

export default SignUp;
