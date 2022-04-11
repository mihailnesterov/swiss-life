import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import MessagesListItem from './MessagesListItem';
import Spinner from '../common/loader/Spinner';
import Pagination from '../common/pagination';
import ListMetaHeader from '../common/header/ListMetaHeader';

const MessagesList = () => {

    const {messages, meta, links, loading} = useSelector( state => state.messages);
    
    const {fetchMessages} = useActions();

    useEffect(() => {
        fetchMessages({'sort': '-created,-isRead'});
    }, []);

    return (
        <div className='messages-list'>
            <div>
                <ListMetaHeader
                    title="Список сообщений"
                    meta={meta}
                />
            </div>
            <div>
                {
                    loading ?
                    <Spinner size={2} /> :
                    messages && 
                    messages.length > 0 &&
                    messages.map(item => <MessagesListItem key={item.id} item={item} />)
                }
            </div>
            {
                links && 
                meta &&
                <Pagination 
                    id={null} 
                    links={links} 
                    meta={meta} 
                    params={{'sort': '-created,-isRead'}}
                    fetchData={fetchMessages}
                />
            }
            
    </div>
    )
}

export default MessagesList;