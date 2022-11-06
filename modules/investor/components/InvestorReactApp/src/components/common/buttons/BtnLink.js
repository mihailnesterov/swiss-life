import React from 'react';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../../api';

const BtnLink = (props) => {

    const {title, resource, className} = props;

    return (
        <Link 
            className={className ||= className} 
            to={`${BASE_URL}/${resource ||= resource}`}
        >
            {title}
        </Link>
    )
}

export default BtnLink;