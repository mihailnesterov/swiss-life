import React, {useState} from 'react';
import GoBackBtn from '../common/buttons/GoBackBtn';
import TransactionForm from './TransactionForm';
import newTransaction from '../../models/transaction';

const TransactionItem = (props) => {

    const {transaction} = props;

    const [empty] = useState(newTransaction);

    return (
        <div className="transaction-item">
            <div>
                <GoBackBtn
                    url='transactions'
                    title='В список операций'
                />
            </div>
            <div className='form-container'>
                <div className='row'>
                    <TransactionForm 
                        transaction={transaction ? transaction : empty} 
                    />
                </div>
            </div>
        </div>
    )
}

export default TransactionItem;