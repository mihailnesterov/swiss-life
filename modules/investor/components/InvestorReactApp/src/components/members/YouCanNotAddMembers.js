import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const YouCanNotAddMembers = () => {
    return (
        <p><FontAwesomeIcon  className='text-red mr-1' icon={solid('ban')} />Вы не можете добавлять подписчиков</p>
    )
}

export default YouCanNotAddMembers;