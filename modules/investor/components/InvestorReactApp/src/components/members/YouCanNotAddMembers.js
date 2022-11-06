import React from 'react';
import { t } from '@lingui/macro';
import Danger from '../common/notice/Danger';

const YouCanNotAddMembers = () => {
    return (
        <Danger 
            title={t({
                id: 'Вы не можете добавлять подписчиков', 
                message: 'Вы не можете добавлять подписчиков'
            })}
        />
    )
}

export default YouCanNotAddMembers;