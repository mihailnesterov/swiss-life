import React from 'react';
import { useSelector } from "react-redux";
import MessagesList from './MessagesList';

const MessagesPageOut = () => {

    const {user} = useSelector( state => state.user);

    return (
        user &&
        <div className='page-messages'>
            <MessagesList user={user} active="out" />
        </div>
    )
}

export default MessagesPageOut;