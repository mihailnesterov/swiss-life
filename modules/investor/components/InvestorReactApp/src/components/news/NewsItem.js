import React from 'react';
import {getDateToString} from '../../utils/dates';
import GoBackBtn from '../../components/common/buttons/GoBackBtn';

const NewsItem = (props) => {

    const {item} = props;

    return (
        <div className="news-item">
            <div>
                <GoBackBtn
                    url='news'
                    title='В список новостей'
                />
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