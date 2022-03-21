import React from 'react';
import {getDateToString} from '../../utils/dates';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';

const NewsListItem = (props) => {

    const {item} = props;

    return (
        <div>
           {item.id}
        </div>
    )
}


export default NewsListItem;