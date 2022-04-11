import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Spinner = (props) => {
    
    const {size} = props;

    return (
        <FontAwesomeIcon 
            spin={true}
            className='text-gold'
            size={size ? `${size}x` : '1x'}
            icon={solid('spinner')}
        />
    )
}

export default Spinner;