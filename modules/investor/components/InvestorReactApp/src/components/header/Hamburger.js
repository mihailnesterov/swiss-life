import React from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';

const Hamburger = () => {

    const {mobileMenu} = useSelector( state => state.mobileMenu);

    const {setMobileMenuOpen, setMobileMenuClose} = useActions();

    const hamburgerHandler = () => {
        if( mobileMenu ) {
            setMobileMenuClose();
        } else {
            setMobileMenuOpen();
        }
    }

    return (
        <div className='hamburger'>
            <button onClick={hamburgerHandler}>
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2" y1="4.05762" x2="20" y2="4.05762" stroke="#CEA15D"/>
                    <line x1="4.37115e-08" y1="7.05762" x2="20" y2="7.05762" stroke="#CEA15D"/>
                    <line x1="20" y1="1.05762" x2="4" y2="1.05762" stroke="#CEA15D"/>
                </svg>
            </button>
        </div>
    )
}

export default Hamburger;