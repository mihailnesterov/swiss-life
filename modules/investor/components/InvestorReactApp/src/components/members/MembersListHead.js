import React from 'react';
import { Trans } from '@lingui/macro';

const MembersListHead = () => {

    return (
        <tr>
            <th><Trans>№</Trans></th>
            <th><Trans>ФИО</Trans></th>
            <th><Trans>Email</Trans></th>
            <th><Trans>Активен</Trans></th>
            <th><Trans>Верифицирован</Trans></th>
            <th><Trans>Статус</Trans></th>
        </tr>
    )
}

export default MembersListHead;