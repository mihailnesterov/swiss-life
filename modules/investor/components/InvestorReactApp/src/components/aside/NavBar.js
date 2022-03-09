import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { investorRoutes } from '../../routes';
import {getInitialItemActive, setPageTitle} from '../../utils/navbar';


const NavBar = () => {
    
    const location = useLocation();

    const [currPathname] = useState(location.pathname);
    const [isItemActive, setItemActive] = useState(() => 
        getInitialItemActive(investorRoutes, currPathname)
    );

    const itemActiveHandler = (item) => {
        setItemActive(item.id);
        setPageTitle(item.title);
    }

    return (
        <nav className='navbar'>
            <ul>
                {
                    investorRoutes.map(item => 
                        item.navbar &&
                        <li key={item.id} 
                            className={isItemActive === item.id ? 'active' : null} 
                            onClick={() => itemActiveHandler(item)}
                        >
                            <Link to={item.path}>{item.icon}{item.title}</Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}


export default NavBar;