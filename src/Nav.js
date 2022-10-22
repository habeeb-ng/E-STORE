// import React from 'react'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
// import "./Nav.css"
import Sidebar from './sideBar';
import {Link} from 'react-router-dom';


const MenuList = () => {
  return (
    <div className='menu__list'>
      {Sidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    
                    {item.icon}
                    <span>{item.title}</span>
                    
                    
                  </Link>
                  
                </li>
              )
            })}
    </div>
  
  )
  
}

function Nav() {
  const [sidebar, setSideBar] = useState(false);

  const handleOpenMenu = () => {
    setSideBar(!sidebar); // this toggles the state 
  }

  return (
    <div className='Nav'>
        <div className="nav--left">
             <h2>E-STORE</h2> 
          </div>
      <div className="nav__right">
        <div className="nav__right__laptop">
          {<MenuList/>}
        </div>
        <Link to="/cart" className="nav__right__cart">
            <ShoppingCartIcon />
          <span>Cart</span>
          
        </Link>
        
        <MenuIcon onClick={handleOpenMenu} className='nav__right__menuOpen' />
        <nav className={sidebar ? "nav__menu" : "nav__menu active"}>
          <ul onClick={handleOpenMenu}>
            <li className='nav__open__container'>
              <MenuOpenIcon className='nav__open' />
            </li>
            
            {Sidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                    {item.icon}
                    
                    
                    
                  </Link>
                  
                </li>
              )
            })}
          </ul>
          
        </nav>
      </div>
      
    </div>
  )
}

export default Nav;