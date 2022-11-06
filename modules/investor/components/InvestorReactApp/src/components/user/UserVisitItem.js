import React from 'react';
import {getDateTimeToString} from '../../utils/dates';

const UserVisitItem = (props) => {

    const {item} = props;

    return(
        <tr>
            <td>{item.ip_address}</td>
            <td>{getDateTimeToString(item.created)}</td>
        </tr>
    )
}

export default UserVisitItem;