import React, {useState} from 'react';
import GoBackBtn from '../common/buttons/GoBackBtn';
import NewsForm from './NewsForm';
import NewsPhoto from './NewsPhoto';
import newNews from '../../models/news';

const NewsItem = (props) => {

    const {news} = props;

    const [empty] = useState(newNews);

    return (
        <div className="news-item">
            <div>
                <GoBackBtn
                    url='news'
                    title='В список новостей'
                />
            </div>
            <div className='form-container'>
                <div className='row'>
                    <NewsForm news={news ? news : empty} />
                    <NewsPhoto news={news ? news : empty} />
                </div>
            </div>
        </div>
    )
}


export default NewsItem;