import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import StatBlock from '../home/StatBlock';
import { Trans, t } from '@lingui/macro';

const UserStat = (props) => {
    
    const {stat, assetsStat} = props;

    return (
        <div>
            {
                stat.length > 0 &&
                stat.map(item => 
                    <div key={item.id}>
                        <StatBlock 
                            title={t({
                                id: 'Сумма контракта', 
                                message: 'Сумма контракта'
                            })}
                            titleBg='bg-blue-light'
                            icon={<FontAwesomeIcon icon={solid('wallet')} />}
                            blockBg='bg-blue'
                            balance={item.contractSum}
                            currencySign={item.currency.sign}
                        />
                        <StatBlock 
                            title={t({
                                id: 'Внесённая сумма', 
                                message: 'Внесённая сумма'
                            })}
                            titleBg='bg-green-light'
                            icon={<FontAwesomeIcon icon={solid('coins')} />}
                            blockBg='bg-green'
                            balance={item.balance}
                            currencySign={item.currency.sign}
                        />
                        <StatBlock 
                            title={t({
                                id: 'Накопленные средства', 
                                message: 'Накопленные средства'
                            })}
                            titleBg='bg-purple-light'
                            icon={<FontAwesomeIcon icon={solid('money-check')} />}
                            blockBg='bg-purple'
                            balance={item.profit}
                            currencySign={item.currency.sign}
                        />
                    </div>
                )
            }
            <div>
            {
                assetsStat.length > 0 &&
                assetsStat.map(item => 
                    <StatBlock 
                        key={item.currency}
                        title={`${t({id: 'Инвестированные средства', message: 'Инвестированные средства'})} (${item.sign})`}
                        titleBg='bg-gold-light'
                        icon={<FontAwesomeIcon icon={solid('chart-line')} />}
                        blockBg='bg-gold'
                        balance={item.total}
                        currencySign={item.sign}
                    />
                )
            }
            </div>
        </div>        
    )
}

export default UserStat;