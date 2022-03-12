import React from 'react';

const TransactionsStatList = (props) => {

    const {stat} = props;

    return (
        <>
            <div>
                <h4>Всего операций</h4>
                {
                    stat.map(item => 
                        <p key={item.id}><b>{item.stat.countAll}</b> <small>({item.currency.shortName})</small></p>
                    )
                }
                <hr />
                <h4>На сумму</h4>
                {
                    stat.map(item => 
                        <p key={item.id}><b>{item.currency.sign} {item.stat.sumAll}</b></p>
                    )
                }
            </div>
            <div>
                <h4>Закрытых операций</h4>
                {
                    stat.map(item => 
                        <p><b>{item.stat.countAccepted}</b> <small>({item.currency.shortName})</small></p>
                    )
                }
                <hr />
                <h4>На сумму</h4>
                {
                    stat.map(item => 
                        <p><b>{item.currency.sign} {item.stat.sumAccepted}</b></p>
                    )
                }
            </div>
        </>
    )
}

export default TransactionsStatList;