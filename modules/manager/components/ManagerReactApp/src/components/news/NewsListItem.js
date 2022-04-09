import React from 'react';
import { useActions } from '../../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 
import {deleteNews} from '../../api/news';
import {getDateToString} from '../../utils/dates';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import EditBtn from '../common/buttons/EditBtn';
import DeleteBtn from '../common/buttons/DeleteBtn';

const NewsListItem = (props) => {

    const {item} = props;

    const {fetchNews} = useActions();

    const onSuccessHandler = () => {
        fetchNews();
    }

    return (
        <div>
            <div>
                {
                    item.newsFiles &&
                    item.newsFiles.length > 0 ?
                    <Link to={`${BASE_URL}/news/${item.id}`}>
                        <img 
                            src={item.newsFiles[0].url} 
                            alt={item.newsFiles[0].name} 
                        />
                    </Link> :
                    <Link to={`${BASE_URL}/news/${item.id}`}>
                        <FontAwesomeIcon 
                            size='3x' 
                            className='text-purple' 
                            icon={solid('image')} 
                        />
                    </Link>
                }
            </div>
            <div>
                <Link to={`${BASE_URL}/news/${item.id}`} title={item.title}>
                    {item.title}
                </Link>
            </div>
            <div>
                <p>{item.excerpt}</p>
            </div>
            <div>
                <p>{item.text}</p>
            </div>
            <div>
                <p>{getDateToString(item.created)}</p>
            </div>
            <div>
                <EditBtn 
                    id={item.id}
                    type='news'
                />
                <DeleteBtn 
                    id={item.id}
                    title={`Удалить новость:\n №${item.id} от ${getDateToString(item.created)}`}
                    onDelete={deleteNews}
                    onSuccess={onSuccessHandler}
                    successMsg='Новость удалена!'
                    errorMsg='Ошибка при удалении новости!'
                />
            </div>
        </div>
    )
}

export default NewsListItem;