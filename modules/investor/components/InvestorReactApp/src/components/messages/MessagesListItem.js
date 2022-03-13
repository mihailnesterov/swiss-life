import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {getDateTimeToString} from '../../utils/dates';

const MessagesListItem = (props) => {

    const {item} = props;

    return (
        <div className='messages-list-item'>
            <div><FontAwesomeIcon size='2x' className={item.isRead === 1 ? 'text-green' : 'text-red'} icon={solid('envelope')} /></div>
            <div><p>{item.theme}</p></div>
            <div><p>{item.text}</p></div>
            <div>
                {
                    item.messageFiles &&
                    item.messageFiles.length > 0 &&
                    item.messageFiles.map(item => <a href={item.url} target="_blank"><img src={item.url} alt={item.name} /></a>)
                }
            </div>
            <div><small>{getDateTimeToString(item.created)}</small></div>
        </div>
    )
}

export default MessagesListItem;