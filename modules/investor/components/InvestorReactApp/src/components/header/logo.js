import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import {RouteNames} from '../../routes';

const Logo = () => {

    const {HOME} = RouteNames;

    const {mobileMenu} = useSelector( state => state.mobileMenu);

    const {setMobileMenuClose} = useActions();

    const handleLogoClick = () => {
        if( mobileMenu ) {
            setMobileMenuClose();
        }
    }

    return (
        <div className='logo'>
            <Link to={HOME} onClick={handleLogoClick}>
                <figure>
                    <img src="./images/logo.png" srcSet="./images/logo.png" alt="Logo" />
                    <figcaption>NSM SWISS LIFE<br /> INVESTMENT &<br /> CONSULTING LP</figcaption>
                </figure>
            </Link>
        </div>
    )
}

export default Logo;