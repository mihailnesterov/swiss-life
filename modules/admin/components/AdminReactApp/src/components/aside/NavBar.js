import React from 'react';
import NavBarList from './NavBarList';
import NavBarToggler from './NavBarToggler';

const NavBar = () => {
    return (
        <nav className='navbar'>
            <NavBarList />
            <NavBarToggler />
        </nav>
    )
}

export default NavBar;