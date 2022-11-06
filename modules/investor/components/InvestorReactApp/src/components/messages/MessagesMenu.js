import React from 'react';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import { Trans } from '@lingui/macro';

const MessagesMenu = (props) => {

    const {active} = props;

    return (
        <ul className="messages-menu">
            <li className={active === 'in' ? 'active' : null}><Link to={`${BASE_URL}/messages-in`}><Trans>Входящие</Trans></Link></li>
            <li className={active === 'out' ? 'active' : null}><Link to={`${BASE_URL}/messages-out`}><Trans>Исходящие</Trans></Link></li>
        </ul>
    )
}

export default MessagesMenu;