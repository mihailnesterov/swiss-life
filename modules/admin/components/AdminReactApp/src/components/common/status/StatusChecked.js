import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const StatusChecked = (props) => {
    
    const {condition, value, textTrue, textFalse} = props;
    
    return (
        condition === value ? 
        <p>
            <FontAwesomeIcon className='text-green' icon={solid('check')} />
            {textTrue}
        </p> :
        <p>
            <FontAwesomeIcon className='text-red' icon={solid('xmark')} /> 
            {textFalse}
        </p> 
    )
}

export default StatusChecked;