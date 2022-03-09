import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import StatBlock from './StatBlock';

const UserStat = (props) => {
    
    const {stat} = props;

    return (
        stat.length > 0 &&
        stat.map(item => 
            <div key={item.id}>
                <div>
                    <StatBlock 
                        title='Сумма контракта'
                        titleBg='bg-blue-light'
                        icon={<FontAwesomeIcon icon={solid('wallet')} />}
                        blockBg='bg-blue'
                        balance={item.contractSum}
                        currencySign={item.currency.sign}
                    />
                    <StatBlock 
                        title='Внесённая сумма'
                        titleBg='bg-green-light'
                        icon={<FontAwesomeIcon icon={solid('coins')} />}
                        blockBg='bg-green'
                        balance={item.balance}
                        currencySign={item.currency.sign}
                    />
                </div>
                <div>
                    <StatBlock 
                        title='Накопленные средства'
                        titleBg='bg-purple-light'
                        icon={<FontAwesomeIcon icon={solid('money-check')} />}
                        blockBg='bg-purple'
                        balance={item.profit}
                        currencySign={item.currency.sign}
                    />
                </div>
            </div>
        )        
    )
}


export default UserStat;