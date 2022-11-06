import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import MessagesListItem from './MessagesListItem';
import Spinner from '../common/loader/Spinner';
import Pagination from '../common/pagination';
import MessagesTools from './MessagesTools';

const MessagesList = (props) => {

    const {user, active} = props;

    const {messages, links, meta, loading} = useSelector( state => state.messages);

    const {fetchMessages} = useActions();

    const [params, setParams] = useState(null);

    useEffect(() => {
        if( user && user.id && active ) {
            
            const _params = {
                'sort': '-created,-isRead',
                'per-page':'10'
            };

            if( active === 'in' ) {
                _params.receiver_id = user.id;
            } else if( active === 'out' ) {
                _params.sender_id = user.id;
            }

            if( _params.receiver_id || _params.sender_id ) {
                setParams(_params);
            }
        }
    },[user, active]);

    useEffect(() => {
        if( params ) {
            fetchMessages(params);
        }
    },[params]);

    const [selectedMessages, setSelectedMessages] = useState([]);

    const selectMessage = (messageId, checked) => {
        if( checked ) {
            setSelectedMessages([...selectedMessages, messageId]);
        } else {
            setSelectedMessages(selectedMessages.filter(id => id !== messageId));
        }
    }

    const [updating, setUpdating] = useState(false);

    return (
        <div className='messages-list'>
            <MessagesTools 
                selectedMessages={selectedMessages} 
                setSelectedMessages={setSelectedMessages}
                setUpdating={setUpdating} 
            />
            <table>
                <tbody>
                    {
                        (loading || updating) ?
                        <Spinner size={2} /> :
                        messages.map(item => <MessagesListItem key={item.id} item={item} selectMessage={selectMessage} />)
                    }
                </tbody>
            </table>
            {
                links && 
                meta &&
                <Pagination 
                    id={null} 
                    links={links} 
                    meta={meta} 
                    params={params}
                    fetchData={fetchMessages}
                />
            }
    </div>
    )
}

export default MessagesList;