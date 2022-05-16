import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { t } from '@lingui/macro';

const MessageEnvelope = (props) => {

    const {isRead, setRead} = props;

    return (
        <FontAwesomeIcon 
            size='2x' 
            className={isRead === 1 ? 'text-green' : 'text-red'} 
            icon={solid('envelope')} 
            onClick={setRead}
            title={`${isRead === 1 ? 
                t({
                    id: 'Пометить как непрочитанное', 
                    message: 'Пометить как непрочитанное'
                }) : 
                t({
                    id: 'Пометить как прочитанное', 
                    message: 'Пометить как прочитанное'
                })}`
            }
        />
    )
}

export default MessageEnvelope;