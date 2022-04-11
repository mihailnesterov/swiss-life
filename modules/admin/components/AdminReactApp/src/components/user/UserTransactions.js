import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {getUserTransactions} from '../../api/transaction';
import {getDateTimeToString} from '../../utils/dates';
import Spinner from '../common/loader/Spinner';

const UserTransactions = (props) => {

    const {user} = props;

    const [userTransactions, setUserTransactions] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user && user.id) {
            setLoading(true);
            getUserTransactions(user.id, {
                'per-page':'10',
                'page':'1',
                'sort':'-created'
            })
            .then(res => setUserTransactions(res.data.transactions))
            .catch(err => console.log(err))
            .finally(() =>setLoading(false));
        }
    }, [user]);

    return (
        user &&
        userTransactions && 
        userTransactions.length > 0 && 
        <div className="form-container">
            <div className='form user-transactions'>
                <h3>Финансовые операции</h3>
                {
                    loading ?
                    <Spinner size={2} /> :
                    userTransactions.map(item => 
                        <div>
                            <small>{getDateTimeToString(item.created)}</small>
                            <small>{item.type.name}</small>
                            <small>{item.sum} {item.currency.sign}</small>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default UserTransactions;