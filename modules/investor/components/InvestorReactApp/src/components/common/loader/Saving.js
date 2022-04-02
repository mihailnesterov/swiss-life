import React from 'react';
import Spinner from './Spinner';

const Saving = (props) => {

    const {saving, text} = props;

    return (
        saving ? 
        <Spinner size={2} /> : 
        text && <h4 className='text-green'>{text}!</h4>
    )
}

export default Saving;