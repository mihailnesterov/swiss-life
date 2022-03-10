import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 
import {getDateToString} from '../../utils/dates';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';

const NewsItem = (props) => {

    const {item} = props;

    return (
        <div className="news-item">
            <div>
                <Link 
                    className='btn btn-more' 
                    to={`${BASE_URL}/news`}
                >
                    <FontAwesomeIcon icon={solid('angles-left')} /> В список новостей
                </Link>
            </div>
            {
                item.newsFiles &&
                item.newsFiles.length > 0 &&
                <div>
                    {
                        item.newsFiles.map(image => 
                            <img 
                                src={image.url} 
                                alt={image.name} 
                            />
                        )
                    }
                </div>
            }
            <div>
                <p><small>{getDateToString(item.created)}</small></p>
                <p>{item.text}</p>
            </div>
        </div>
    )
}


export default NewsItem;