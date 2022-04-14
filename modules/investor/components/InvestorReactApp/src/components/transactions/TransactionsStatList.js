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
                        <p key={item.id}><b>{item.currency.sign} {item.stat.sumAll ? item.stat.sumAll : 0}</b></p>
                    )
                }
            </div>
            <div>
                <h4>На рассмотрении</h4>
                {
                    stat.map(item => 
                        <p key={item.id}><b>{item.stat.countNotAccepted}</b> <small>({item.currency.shortName})</small></p>
                    )
                }
                <hr />
                <h4>На сумму</h4>
                {
                    stat.map(item => 
                        <p key={item.id}><b>{item.currency.sign} {item.stat.sumNotAccepted ? item.stat.sumNotAccepted : 0}</b></p>
                    )
                }
            </div>
        </>
    )
}

export default TransactionsStatList;