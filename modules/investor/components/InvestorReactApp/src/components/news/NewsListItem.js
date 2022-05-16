import React from 'react';
import {getDateToString} from '../../utils/dates';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import { Trans } from '@lingui/macro';

const NewsListItem = (props) => {

    const {item} = props;

    return (
        <div>
            {
                item.newsFiles &&
                item.newsFiles.length > 0 &&
                <Link to={`${BASE_URL}/news/${item.id}`}>
                    <img 
                        src={item.newsFiles[0].url} 
                        alt={item.newsFiles[0].name} 
                    />
                </Link>
            }
            <div>
                <h3>
                    {item.title}
                </h3>
                <p><small>{getDateToString(item.created)}</small></p>
                <p>{item.excerpt}</p>
                <Link className='btn btn-more' to={`${BASE_URL}/news/${item.id}`}><Trans>Подробнее...</Trans></Link>
            </div>
        </div>
    )
}


export default NewsListItem;