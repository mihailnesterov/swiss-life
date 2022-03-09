import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

const Logo = () => {
    return (
        <div>
           <FontAwesomeIcon size='2x' className='text-gold' icon={regular('gem')} />
        </div>
    )
}


export default Logo;