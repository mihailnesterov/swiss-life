import React from 'react';
import { useActions } from '../../hooks/useActions';
import {getDateTimeToString} from '../../utils/dates';
import {updateMessage} from '../../api/message';
import MessageEnvelope from './MessageEnvelope';

const MessagesListItem = (props) => {

    const {item} = props;

    const {fetchUserAuthorizedExpanded} = useActions();

    const handleChangeRead = () => {
        if(item && item.id) {
            updateMessage(item.id, {
                'isRead': item.isRead === 1 ? 0 : 1
            }).then(res => fetchUserAuthorizedExpanded())
            .catch(err => console.log(err))
        }
    }

    return (
        <div className='messages-list-item'>
            <div>
                <MessageEnvelope 
                    isRead={item.isRead}
                    setRead={handleChangeRead}
                />
            </div>
            <div><p>{item.theme}</p></div>
            <div><p>{item.text}</p></div>
            <div>
                {
                    item.messageFiles &&
                    item.messageFiles.length > 0 &&
                    item.messageFiles.map(item => 
                        <a 
                            key={item.id}
                            href={item.url} 
                            target="_blank"
                        >
                            <img src={item.url} alt={item.name} />
                        </a>
                    )
                }
            </div>
            <div><small>{getDateTimeToString(item.created)}</small></div>
        </div>
    )
}

export default MessagesListItem;