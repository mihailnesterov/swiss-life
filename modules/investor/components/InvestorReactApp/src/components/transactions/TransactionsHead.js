import React from 'react';
import { Trans } from '@lingui/macro';

const TransactionsHead = () => {

    return (
        <div>
            <h4><Trans>№</Trans></h4>
            <h4><Trans>Дебет</Trans></h4>
            <h4><Trans>Кредит</Trans></h4>
            <h4><Trans>Сумма</Trans></h4>
            <h4><Trans>Валюта</Trans></h4>
            <h4><Trans>Вид операции</Trans></h4>
            <h4><Trans>Описание</Trans></h4>
            <h4><Trans>Статус</Trans></h4>
            <h4><Trans>Дата открытия</Trans></h4>
            <h4><Trans>Дата проведения</Trans></h4>
        </div>
    )
}

export default TransactionsHead;