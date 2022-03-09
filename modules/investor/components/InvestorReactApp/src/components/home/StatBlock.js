import React from 'react';

const StatBlock = (props) => {
    
    const {title, titleBg, icon, blockBg, balance, currencySign} = props;

    return (
        <div className={`stat-block ${blockBg}`}>
            <h3 className={titleBg}>{icon} {title}</h3>
            <p>Текущий баланс</p>
            <h2>{currencySign} {balance}</h2>
        </div>
    )
}


export default StatBlock;