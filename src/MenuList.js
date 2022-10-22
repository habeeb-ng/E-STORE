import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import GroupsIcon from '@mui/icons-material/Groups';
import { useSelector } from 'react-redux';
const Sidebar = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon className='menu__list__icon'/>,
        cName:'nav__text'
    },
    {
        title: 'About Us',
        path: '/about',
        icon: <GroupsIcon className='menu__list__icon'/>,
        cName:'nav__text'
    },
    {
        title: 'Contact Us',
        path: '/contact',
        icon: <ContactPhoneIcon className='menu__list__icon'/>,
        cName:'nav__text'
  },
]

function Menu() {
  return (
    <div>
      
    </div>
  )
}

export default MenuList
