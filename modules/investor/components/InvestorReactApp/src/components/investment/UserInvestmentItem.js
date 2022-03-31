import React from 'react';
import {getDateToString} from '../../utils/dates';

const UserInvestmentItem = (props) => {

    const {item} = props;

    return (
        <div>
            <p>Объект: <b>{item.name}</b></p>
            <p>Дата: <b>{getDateToString(item.created)}</b></p>
            <p>Сумма: <b>{item.sum} {item.sign}</b></p>
        </div>
    )
}

export default UserInvestmentItem;