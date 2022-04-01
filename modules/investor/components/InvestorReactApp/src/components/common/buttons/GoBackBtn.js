import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../../api';

const GoBackBtn = (props) => {

    const {url, title} = props;

    return (
        <Link 
            className='btn btn-more' 
            to={`${BASE_URL}/${url}`}
        >
            <FontAwesomeIcon icon={solid('angles-left')} /> {title ? title : 'Вернуться в список'}
        </Link>
    )
}

export default GoBackBtn;