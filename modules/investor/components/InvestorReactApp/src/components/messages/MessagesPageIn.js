import React from 'react';
import { useSelector } from "react-redux";
import MessagesList from './MessagesList';

const MessagesPageIn = () => {

    const {user} = useSelector( state => state.user);

    return (
        user &&
        <div className='page-messages'>
            <MessagesList user={user} active="in" />
        </div>
    )
}

export default MessagesPageIn;