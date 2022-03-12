import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import MessagesListItem from './MessagesListItem';
import Spinner from '../common/loader/Spinner';

const MessagesList = () => {

    const {user, loading} = useSelector( state => state.user);

    const [messages, setMessages] = useState(null);

    useEffect(() => {
        if(user.messages && user.messages.length > 0) {
            setMessages(user.messages);
        }
    },[user]);

    console.log(messages);

    return (
        <div className='messages-list'>
            {
                loading ?
                <Spinner size={2} /> :
                messages &&
                messages.map(item => <MessagesListItem item={item} />)
            }
    </div>
    )
}


export default MessagesList;