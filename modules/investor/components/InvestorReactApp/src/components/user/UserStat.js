import React from 'react';
import StatBlock from '../home/StatBlock';
import BtnLink from '../common/buttons/BtnLink';
import { t } from '@lingui/macro';

const UserStat = (props) => {
    
    const {stat, assetsStat, leverageStat} = props;

    return (
        <div>                
            {
                stat.length > 0 &&
                <div>
                    <StatBlock 
                        title={t({
                            id: 'Контрактная сумма', 
                            message: 'Контрактная сумма'
                        })}
                        stat={stat.map(item => {
                            return {balance: item.contractSum, sign: item.currency.sign}
                        })}
                    />
                    <StatBlock 
                        title={t({
                            id: 'Сумма депозита', 
                            message: 'Сумма депозита'
                        })}
                        stat={stat.map(item => {
                            return {balance: item.depositSum, sign: item.currency.sign}
                        })}
                    />
                    <StatBlock 
                        title={t({
                            id: 'Сумма инвестиций', 
                            message: 'Сумма инвестиций'
                        })}
                        stat={assetsStat.map(item => {
                            return {balance: item.total, sign: item.sign}
                        })}
                    />
                    <StatBlock 
                        title={t({
                            id: 'Текущий баланс', 
                            message: 'Текущий баланс'
                        })}
                        stat={stat.map(item => {
                            return {balance: item.balance, sign: item.currency.sign}
                        })}
                    />
                    <StatBlock 
                        title={t({
                            id: 'Кредитный баланс', 
                            message: 'Кредитный баланс'
                        })}
                        stat={leverageStat.map(item => {
                            return {balance: item.total, sign: item.sign}
                        })}
                    />
                    <StatBlock 
                        title={t({
                            id: 'Накопленные средства', 
                            message: 'Накопленные средства'
                        })}
                        stat={stat.map(item => {
                            return {balance: item.profit, sign: item.currency.sign}
                        })}
                    />
                </div>
            }
           <div>
                <BtnLink
                    title={t({
                        id: 'Кредитное плечо', 
                        message: 'Кредитное плечо'
                    })}
                    resource="credit"
                    className="btn btn-gold"
                />
                <BtnLink
                    title={t({
                        id: 'Открыть счет', 
                        message: 'Открыть счет'
                    })}
                    resource="add-account"
                    className="btn btn-default"
                />
            </div>
        </div>        
    )
}

export default UserStat;