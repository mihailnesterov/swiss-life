import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../../api';

const EditBtn = (props) => {

    const {id, type, size, title} = props;

    return (
        <Link className='btn-edit' to={`${BASE_URL}/${type}/${id}`}>
            <FontAwesomeIcon  
                size={size ? size : '2x'}
                title={title ? title : 'Редактировать'}
                icon={solid('square-pen')} 
            />
        </Link>
    )
}

export default EditBtn;