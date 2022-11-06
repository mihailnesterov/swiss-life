import React from 'react';
import { Trans } from '@lingui/macro';

const TransactionsStatList = (props) => {

    const {stat} = props;

    return (
        <>
            <div>
                <div>
                    <h4><Trans>Всего операций</Trans></h4>
                    <div>
                        {
                            stat.map(item => 
                                item.stat.countAll > 0 && 
                                <p key={item.id}><span>{item.stat.countAll}</span><span>({item.currency.shortName})</span></p>
                            )
                        }
                    </div>
                </div>
                <div>
                    <h4><Trans>На сумму</Trans></h4>
                    <div>
                        {
                            stat.map(item => 
                                item.stat.sumAll > 0 && 
                                <p key={item.id}><span>{item.currency.sign}</span><span>{item.stat.sumAll ? item.stat.sumAll : 0}</span></p>
                            )
                        }
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h4><Trans>На рассмотрении</Trans></h4>
                    <div>
                        {
                            stat.map(item => 
                                item.stat.countNotAccepted > 0 && 
                                <p key={item.id}><span>{item.stat.countNotAccepted}</span><span>({item.currency.shortName})</span></p>
                            )
                        }
                    </div>
                </div>
                <div>
                    <h4><Trans>На сумму</Trans></h4>
                    <div>
                        {
                            stat.map(item => 
                                item.stat.sumNotAccepted > 0 && 
                                <p key={item.id}><span>{item.currency.sign}</span><span>{item.stat.sumNotAccepted ? item.stat.sumNotAccepted : 0}</span></p>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionsStatList;