import React from 'react';
import { Trans } from '@lingui/macro';

const MembersListHead = () => {

    return (
        <div>
            <h4><Trans>№</Trans></h4>
            <h4><Trans>ФИО</Trans></h4>
            <h4>Email</h4>
            <h4><Trans>Активен</Trans></h4>
            <h4><Trans>Верифицирован</Trans></h4>
            <h4><Trans>Статус</Trans></h4>
        </div>
    )
}

export default MembersListHead;