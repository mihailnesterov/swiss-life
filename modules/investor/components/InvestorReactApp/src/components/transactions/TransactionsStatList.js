import React from 'react';
import { Trans } from '@lingui/macro';

const TransactionsStatList = (props) => {

    const {stat} = props;

    return (
        <>
            <div>
                <h4><Trans>Всего операций</Trans></h4>
                {
                    stat.map(item => 
                        <p key={item.id}><b>{item.stat.countAll}</b> <small>({item.currency.shortName})</small></p>
                    )
                }
                <hr />
                <h4><Trans>На сумму</Trans></h4>
                {
                    stat.map(item => 
                        <p key={item.id}><b>{item.currency.sign} {item.stat.sumAll ? item.stat.sumAll : 0}</b></p>
                    )
                }
            </div>
            <div>
                <h4><Trans>На рассмотрении</Trans></h4>
                {
                    stat.map(item => 
                        <p key={item.id}><b>{item.stat.countNotAccepted}</b> <small>({item.currency.shortName})</small></p>
                    )
                }
                <hr />
                <h4><Trans>На сумму</Trans></h4>
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