import React from 'react';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import StatList from './StatList';
import Spinner from '../common/loader/Spinner';

const HomePage = () => {
    
    const {user, loading} = useSelector( state => state.user);

    return (
        <div className='homepage'>
            {
                loading ?
                <Spinner size={2} /> :
                user && 
                <>
                <StatList 
                    title='Статистика пользователей' 
                    icon={<FontAwesomeIcon icon={solid('user')} />}
                    stat={[
                        {'Всего':user.usersCountAll},
                        {'Активных':user.usersCountActive},
                        {'Отключенных':user.usersCountNotActive},
                        {'Верифицированных':user.usersCountVerified},
                        {'Не верифицированных':user.usersCountNotVerified},
                        {'Представителей':user.usersCountRepresentive},
                        {
                            'Статусы': 
                            user.usersByStatuses &&
                            user.usersByStatuses.length > 0 ?
                            user.usersByStatuses.map(
                                (item,i) => <span key={i}>{item.status} ({item.count}) </span>)
                            : '-'
                        },
                    ]} 
                />
                {
                    user.transactionsTotalSum &&
                    user.transactionsTotalSum.length > 0 &&
                    user.transactionsDebitSum &&
                    user.transactionsDebitSum.length > 0 &&
                    user.transactionsCreditSum &&
                    user.transactionsCreditSum.length > 0 &&
                    <StatList 
                        title='Финансовая статистика' 
                        icon={<FontAwesomeIcon icon={solid('coins')} />}
                        stat={[
                            {
                                'Дебет': user.transactionsDebitSum.map(
                                    (item,i) => <span key={i}>{item.total} {item.sign}</span>)
                            },
                            {
                                'Кредит': user.transactionsCreditSum.map(
                                    (item,i) => <span key={i}>{item.total} {item.sign}</span>)
                            },
                            {
                                'Итого': user.transactionsTotalSum.map(
                                    (item,i) => <span key={i}>{item.total} {item.sign}</span>)
                            },
                        ]} 
                    />
                }
                {
                    user.assetsTotalSum &&
                    user.assetsTotalSum.length > 0 &&
                    user.assetsTotalCount &&
                    user.assetsTotalCount.length > 0 &&
                    <StatList 
                        title='Инвестиции в активы' 
                        icon={<FontAwesomeIcon icon={solid('briefcase')} />}
                        stat={[
                            {
                                'Количество взносов': user.assetsTotalCount.map(
                                    (item,i) => <span key={i}>{item.count} ({item.sign}) </span>)
                            },
                            {
                                'Сумма инвестиций': user.assetsTotalSum.map(
                                    (item,i) => <span key={i}>{item.total} {item.sign}</span>)
                            }
                        ]} 
                    />
                }
                </>
            }
        </div>
    )
}

export default HomePage;