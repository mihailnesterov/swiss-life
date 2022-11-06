import React from 'react';

const StatBlock = (props) => {
    
    const {title, stat} = props;

    return (
        <div className="stat-block">
            <h3>{title}</h3>
            <p>
                {
                    stat
                        .filter(item => item.balance > 0)
                        .map(item => <span>{item.sign}&nbsp;{item.balance}&emsp;</span>)
                }
            </p>
        </div>
    )
}

export default StatBlock;