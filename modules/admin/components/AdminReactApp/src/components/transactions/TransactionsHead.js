import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 

const TransactionsHead = () => {
    return (
        <div>
            <h4>№</h4>
            <h4>Пользователь</h4>
            <h4>Дебет</h4>
            <h4>Кредит</h4>
            <h4>Сумма</h4>
            <h4>Валюта</h4>
            <h4>Вид операции</h4>
            <h4>Описание</h4>
            <h4>Статус</h4>
            <h4>Дата открытия</h4>
            <h4>Дата проведения</h4>
            <h4><FontAwesomeIcon icon={solid('gear')} /></h4>
        </div>
    )
}


export default TransactionsHead;