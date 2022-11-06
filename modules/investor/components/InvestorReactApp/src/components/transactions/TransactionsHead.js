import React from 'react';
import { Trans } from '@lingui/macro';

const TransactionsHead = () => {

    return (
        <tr>
            <th><Trans>Дата</Trans></th>
            <th><Trans>Вид операции</Trans></th>
            <th><Trans>Описание</Trans></th>
            <th><Trans>Дебет</Trans></th>
            <th><Trans>Кредит</Trans></th>
            <th><Trans>Баланс</Trans></th>
            <th><Trans>Статус</Trans></th>
        </tr>
    )
}

export default TransactionsHead;