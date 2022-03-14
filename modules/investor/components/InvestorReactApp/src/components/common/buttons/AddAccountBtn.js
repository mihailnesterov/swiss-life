import React from 'react';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const AddAccountBtn = () => {
    return (
        <Link 
            className='btn btn-add-account' 
            to={`${BASE_URL}/add-account`}
        >
            <FontAwesomeIcon icon={solid('plus')} />
            Открыть счет
        </Link>
    )
}


export default AddAccountBtn;