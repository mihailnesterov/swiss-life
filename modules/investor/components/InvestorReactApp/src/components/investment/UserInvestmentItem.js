import React from 'react';
import {getDateToString} from '../../utils/dates';
import { Trans } from '@lingui/macro';

const UserInvestmentItem = (props) => {

    const {item} = props;

    return (
        <div>
            <p><Trans>Объект</Trans>: <b>{item.name}</b></p>
            <p><Trans>Дата</Trans>: <b>{getDateToString(item.created)}</b></p>
            <p><Trans>Сумма</Trans>: <b>{item.sum} {item.sign}</b></p>
        </div>
    )
}

export default UserInvestmentItem;