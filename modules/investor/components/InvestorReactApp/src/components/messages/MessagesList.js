import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import MessagesListItem from './MessagesListItem';
import Spinner from '../common/loader/Spinner';
import Pagination from '../common/pagination';
import {getMessages} from '../../api/message';

const MessagesList = () => {

    const {user} = useSelector( state => state.user);

    const [messages, setMessages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState(null);
    const [links, setLinks] = useState(null);
    const [isActive, setActive] = useState(1);

    useEffect(() => {
        getMessagesIn();
    },[user]);

    const getMessagesIn = useCallback(() => {
        if(user && user.id) {
            setLoading(true);
            getMessages({
                'receiver_id': user.id,
                'sort': '-created,-isRead'
            })
            .then(res => {
                setMessages(res.data.messages);
                setMeta(res.data._meta);
                setLinks(res.data._links);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
        }
        setActive(1);
    },[user]);

    const getMessagesOut = useCallback(() => {
        if(user && user.id) {
            setLoading(true);
            getMessages({
                'sender_id': user.id,
                'sort': '-created,-isRead'
            })
            .then(res => {
                setMessages(res.data.messages);
                setMeta(res.data._meta);
                setLinks(res.data._links);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
        }
        setActive(2);
    },[user]);

    return (
        <div className='messages-list'>
            <div>
                <h3>Список сообщений{meta && meta.totalCount && ` (${meta.totalCount})`}</h3>
                <div>
                    <button 
                        className={isActive === 1 ? 'active' : null} 
                        onClick={getMessagesIn}
                    >Входящие</button>
                    <button 
                        className={isActive === 2 ? 'active' : null} 
                        onClick={getMessagesOut}
                    >Исходящие</button>
                </div>
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
                    params={{
                        'sender_id': user.id,
                        'sort': '-created,-isRead'
                    }}
                    fetchData={getMessages}
                />
            }
            
    </div>
    )
}


export default MessagesList;