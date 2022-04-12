import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const MessageEnvelope = (props) => {

    const {isRead, setRead} = props;

    return (
        <FontAwesomeIcon 
            size='2x' 
            className={isRead === 1 ? 'text-green' : 'text-red'} 
            icon={solid('envelope')} 
            onClick={setRead}
            title={`${isRead === 1 ? "Пометить как непрочитанное" : "Пометить как прочитанное"}`}
        />
    )
}

export default MessageEnvelope;