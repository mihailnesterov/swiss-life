import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const NavBarToggler = () => {

    return (
        <div className='navbar-toggler'>
            <button>
                <FontAwesomeIcon size='2x' icon={solid('circle-chevron-left')} />
            </button>
        </div>
    )
}

export default NavBarToggler;