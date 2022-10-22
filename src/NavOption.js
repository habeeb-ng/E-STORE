import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
function NavOption({ title, className, path, Icon, onClick }) {
  const resolvedPath = useResolvedPath(path);
  const current = useMatch({ path: resolvedPath.pathname })
  return (
    <div className={current? "navOption currentPage" : "navOption"}>
      <Link to={path} onClick={onClick}>
         <span>{title}</span>
          <Icon/>   
        </Link>
    </div>
  )
}

export default NavOption;
