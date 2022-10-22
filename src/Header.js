import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Sidebar from './sideBar';
import { Link, unstable_HistoryRouter, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import "./Header.css"

// import Nav from "./Nav";
import NavBar from './NavBar';


function Header({ setSearch, sidebar, setSideBar }) {
    // const [sidebar, setSideBar] = useState(false);
    // const handleOpenMenu = () => {
    // setSideBar(!sidebar); // this toggles the state
    // }
    const navigate = useNavigate()
  
    const [searchKey, setSearchKey] = useState('')
    const handleSearch = (eventObj) => {
      eventObj.preventDefault();
      if (!searchKey.length) {
        navigate("/")
      } else {
        setSearch(searchKey);
      navigate("/filterd")
      }
      
    }
  return (
    <div className="Header">
        <div className="container">
              {/* logo */}
            <div className="Header__logo" onClick={()=>{navigate("/")}}>
                <h2>E-STORE</h2> 
            </div>
            {/* search */}
            <div className="header__search">
                
                <form onSubmit={handleSearch}>
                    <label for="search"><SearchIcon /></label>
                    <input id="search" value={searchKey}
                    onChange={(e)=>setSearchKey(e.target.value)}    placeholder="Search" type="" />
                </form>
                    
                
            </div>
              {/* Nav */}
              <NavBar sideBar={sidebar} setSideBar={setSideBar} onClick ={()=>setSearchKey(null)} />
              
        </div>
    </div>
  )
}

export default Header;