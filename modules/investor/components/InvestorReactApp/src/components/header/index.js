import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import LangSwitcher from './LangSwitcher';
import Hamburger from './Hamburger';
import UserMailBox from './UserMailBox';
import UserMenu from './UserMenu';
import Logo from './logo';

const Header = () => {
    
    const {user} = useSelector( state => state.user);
    
    const {fetchUserAuthorizedExpanded} = useActions();

    useEffect(() => {
        fetchUserAuthorizedExpanded();
    },[]);

    return (
        <header className='header'>
            <Logo />
            <div>
                {
                    user &&
                    <>
                        <LangSwitcher user={user} />
                        <UserMailBox newMessages={user.newMessages} />
                        <UserMenu user={user}/>
                    </>
                }
                <Hamburger />
            </div>
        </header>
    )
}

export default Header;