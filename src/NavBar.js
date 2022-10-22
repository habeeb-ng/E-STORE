import React, { useEffect, useRef, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
  import ClearIcon from '@mui/icons-material/Clear';
import "./NavBar.css"
import { Link, useResolvedPath, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavOption from './NavOption';
import {logout} from "./features/userSlice"
import { auth } from './backend/firebase';
import { signOut } from 'firebase/auth';
function NavBar() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [sidebar, setSideBar] = useState(false);
  const menuRef = useRef()
  const navigate = useNavigate()
  useEffect(() => {
    document.onmousedown = (eventObj) => {
      if (!menuRef.current.contains(eventObj.target)) {
        setSideBar(false);
      }
      
    }
  });
  const handleOpenMenu = () => {
    setSideBar(!sidebar); // this toggles the state 
  }
  const handleSignOut=() => {
    signOut(auth)
    .then((user) => {
      console.log(user, "signed Out")
      dispatch(logout());
    })
  }
  return (
    <div ref={menuRef} className="nav__container ">
      <MenuIcon onClick={handleOpenMenu} className='nav_menuOpen' />
      <nav className={!sidebar ? 'navBar' : "navBar active"}>
        
        <ClearIcon onClick={handleOpenMenu} className="clearIcon" />
          
        <div className="menu__content">
          
          <NavOption title='Home' className='nav__text' path='/' onClick={handleOpenMenu} Icon={HomeIcon} />
          {user && (<NavOption title='Your Profile' className='nav__text' path='/profile' onClick={handleOpenMenu} Icon={Person2Icon} />) }
          <NavOption title='Contact Us' className='nav__text' path='/contact' onClick={handleOpenMenu} Icon={ContactPhoneIcon} />
          <NavOption title='About Us' className='nav__text' path='/about' onClick={handleOpenMenu} Icon={GroupsIcon} />
          {/*need an onclick event for the below signIn/signOut component 
          that logs the user out onli if the user is logged in */}
          
          <NavOption title='Your Cart' className='nav__text' path={'/cart'} onClick={() => {
            handleOpenMenu();
            !user && navigate('/')
          }} Icon={ShoppingCartIcon} />
          <NavOption title={!user ? "Sign In" : "Sign Out"} className='nav__text' path={'signIn'} onClick={() => {
            handleOpenMenu();
            user && handleSignOut();
            
          }} Icon={GroupsIcon} />
          
        </div>
      </nav>
    </div>
    
  )
}

export default NavBar;