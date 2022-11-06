import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import { Link, useLocation } from 'react-router-dom';
import { investorRoutes } from '../../routes';
import {getInitialItemActive, setPageTitle} from '../../utils/navbar';
import { t } from "@lingui/macro";

const NavBarList = () => {

    const {navbar} = useSelector( state => state.navbar);
    const {mobileMenu} = useSelector( state => state.mobileMenu);

    const {setMobileMenuClose} = useActions();
    const location = useLocation();

    const [currPathname] = useState(location.pathname);
    const [isItemActive, setItemActive] = useState(() => 
        getInitialItemActive(investorRoutes, currPathname)
    );

    const handleItemActive = item => {
        setItemActive(item.id);
        setPageTitle(item.title);
        if (mobileMenu) {
            setMobileMenuClose();
        }
    }

    return (
        <ul className='navbar-list'>
            {
                investorRoutes.map(item => 
                    item.navbar &&
                    <li key={item.id} 
                        className={isItemActive === item.id ? 'active' : null} 
                        onClick={() => handleItemActive(item)}
                    >
                        <Link 
                            to={item.path} 
                            title={!navbar ? t({id: item.title, message: item.title}) : undefined}
                            className={item.size === 'small' ? 'small' : null}
                        >
                            {navbar && t({id: item.title, message: item.title})}
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}

export default NavBarList;