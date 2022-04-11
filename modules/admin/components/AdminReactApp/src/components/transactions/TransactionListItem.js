import React from 'react';
import { useActions } from '../../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 
import {getDateTimeToString} from '../../utils/dates';
import EditBtn from '../common/buttons/EditBtn';
import DeleteBtn from '../common/buttons/DeleteBtn';
import {deleteTransaction} from '../../api/transaction';

const TransactionListItem = (props) => {

    const {item} = props;

    const {fetchTransactions} = useActions();

    const onSuccessHandler = () => {
        fetchTransactions({
            'sort':'-created'
        });
    }

    return (
        <div>
            <div>
                {item.id}
            </div>
            <div>
                {item.user.fullName}
            </div>
            <div>
                {
                    item.debit > 0 ?
                    <FontAwesomeIcon className='text-green' icon={solid('plus')} /> :
                    <FontAwesomeIcon className='text-red' icon={solid('minus')} />
                }
            </div>
            <div>
                {
                    item.credit < 0 ?
                    <FontAwesomeIcon className='text-green' icon={solid('plus')} /> :
                    <FontAwesomeIcon className='text-red' icon={solid('minus')} />
                }
            </div>
            <div>
                {item.sum}
            </div>
            <div>
                <span className='text-gold'>
                    {item.currency.sign}
                </span>
            </div>
            <div>
                {item.type.name}
            </div>
            <div>
                {item.description}
            </div>
            <div>
                {
                    item.status === 1 ?
                    <FontAwesomeIcon className='text-green' icon={solid('check')} /> :
                    <FontAwesomeIcon className='text-red' icon={solid('xmark')} />
                }
            </div>
            <div>
                {getDateTimeToString(item.created)}
            </div>
            <div>
                {item.accepted && getDateTimeToString(item.accepted)}
            </div>
            <div>
                <EditBtn 
                    id={item.id}
                    type='transactions'
                />
                <DeleteBtn 
                    id={item.id}
                    title={`Удалить финансовую операцию:\n №${item.id} от ${getDateTimeToString(item.created)}`}
                    onDelete={deleteTransaction}
                    onSuccess={onSuccessHandler}
                    successMsg='Операция удалена!'
                    errorMsg='Ошибка при удалении финансовой операции!'
                />
            </div>
        </div>
    )
}

export default TransactionListItem;