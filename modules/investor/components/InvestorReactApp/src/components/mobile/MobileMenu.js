import React from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import NavBar from '../aside/NavBar';
import LangSwitcher from '../header/LangSwitcher';
import Logo from '../header/logo';
import UserMenu from '../header/UserMenu';

const MobileMenu = () => {
    
    const {mobileMenu} = useSelector( state => state.mobileMenu);
    const {user} = useSelector( state => state.user);

    const {setMobileMenuClose} = useActions();

    const handleMobileMenuClick = () =>  setMobileMenuClose();

    const handleAsideClick = e => e.stopPropagation();
    
    return (
        mobileMenu &&
        <div className='mobile-menu' onClick={handleMobileMenuClick}>
            <aside className='aside' onClick={handleAsideClick}>
                <Logo />
                <UserMenu user={user}/>
                <LangSwitcher user={user} />
                <NavBar />
            </aside>
        </div>
    )
}

export default MobileMenu;