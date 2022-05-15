import React from 'react';
import { Trans } from '@lingui/macro';

const StatBlock = (props) => {
    
    const {title, titleBg, icon, blockBg, balance, currencySign} = props;

    return (
        <div className={`stat-block ${blockBg}`}>
            <h3 className={titleBg}>{icon} {title}</h3>
            <p><Trans>Текущий баланс</Trans></p>
            <h2>{currencySign} {balance}</h2>
        </div>
    )
}

export default StatBlock;