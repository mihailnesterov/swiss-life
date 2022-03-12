import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Icons = {
    open: <FontAwesomeIcon size='2x' icon={solid('circle-chevron-left')} />,
    close: <FontAwesomeIcon size='2x' icon={solid('circle-chevron-right')} />
}

const NavBarToggler = () => {

    const {navbar} = useSelector( state => state.navbar);

    const {setNavbarOpen, setNavbarClose} = useActions();

    const [icon, setIcon] = useState(Icons.open);

    const togglerHandler = () => {
        if( navbar ) {
            setNavbarClose();
            setIcon(Icons.close);
        } else {
            setNavbarOpen();
            setIcon(Icons.open);
        }
    }

    return (
        <div className='navbar-toggler'>
            <button onClick={togglerHandler}>
                {icon}
            </button>
        </div>
    )
}

export default NavBarToggler;