import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import { investorRoutes } from '../../routes';
import {getInitialItemActive, setPageTitle} from '../../utils/navbar';
import { t } from "@lingui/macro";

const NavBarList = () => {

    const {navbar} = useSelector( state => state.navbar);
    
    const location = useLocation();

    const [currPathname] = useState(location.pathname);
    const [isItemActive, setItemActive] = useState(() => 
        getInitialItemActive(investorRoutes, currPathname)
    );

    const itemActiveHandler = (item) => {
        setItemActive(item.id);
        setPageTitle(t({id: item.title, message: item.title}));
    }

    return (
        <ul className='navbar-list'>
            {
                investorRoutes.map(item => 
                    item.navbar &&
                    <li key={item.id} 
                        className={isItemActive === item.id ? 'active' : null} 
                        onClick={() => itemActiveHandler(item)}
                    >
                        <Link 
                            to={item.path} 
                            title={!navbar ? t({id: item.title, message: item.title}) : undefined}
                        >
                            {item.icon}{navbar && t({id: item.title, message: item.title})}
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}

export default NavBarList;