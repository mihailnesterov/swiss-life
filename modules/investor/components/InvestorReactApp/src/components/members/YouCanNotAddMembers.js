import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Trans } from '@lingui/macro';

const YouCanNotAddMembers = () => {
    return (
        <p><FontAwesomeIcon  className='text-red mr-1' icon={solid('ban')} /><Trans>Вы не можете добавлять подписчиков</Trans></p>
    )
}

export default YouCanNotAddMembers;