import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../../api';
import { t } from '@lingui/macro';

const GoBackBtn = (props) => {

    const {url, title} = props;

    return (
        <Link 
            className='btn btn-back' 
            to={`${BASE_URL}/${url}`}
        >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="39" height="39" stroke="#F8F8F8"/>
                <path d="M9.83073 19.5013L29.1641 19.5013M18.2891 11.043L9.83073 19.5013L18.2891 27.9596" stroke="#F8F8F8" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> {title ? title : t({
                id: 'Вернуться в список', 
                message: 'Вернуться в список'
            })}
        </Link>
    )
}

export default GoBackBtn;