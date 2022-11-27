import React, { useEffect, useState, useRef } from 'react';
import {getTransactionTypes, getTransactionType} from '../../../api/transactionType';

const AutocompleteTransactionType = (props) => {

    const {transaction, setParams, params} = props;

    const [transactionType, setTransactionType] = useState(null);
    const [transactionTypes, setTransactionTypes] = useState(null);

    const [isDropdownListOpen, setDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        getTransactionTypes()
            .then(res => setTransactionTypes(res.data))
            .catch(err => console.log(`get transactionTypes error`, err));
    }, []);

    useEffect(() => {
        if(transactionTypes && transactionTypes.length > 0 && transaction && transaction.transaction_type_id) {
            getTransactionType(transaction.transaction_type_id)
                .then(res => setTransactionType(res.data))
                .catch(err => console.log(`get get transaction type by id error`, err));
        }
    }, [transactionTypes, transaction]);

    const handleClickTransactionType = () => {
        setClickedOutside(false);
        setDropdownListOpen(true);
    }

    const handleSelectTransactionTypeId = item => {
        setTransactionType(item);
        setParams({
            'transaction_type_id':Number(item.id),
            ...params
        });
        setDropdownListOpen(false);
    }

    const onDropdownListClickOutsideHandler = e => {
        if (dropdownListRef.current && !dropdownListRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
    };

    const onDropdownListClickInsideHandler = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener('mousedown', onDropdownListClickOutsideHandler);
        return () => document.removeEventListener('mousedown', onDropdownListClickOutsideHandler);
    }, []);

    return (
        <label 
            htmlFor="transaction-types"
            className='autocomplete'
        >
            <p><small>Вид операции</small></p>
            <input 
                name='transaction-types'
                type='text'
                placeholder='Выберите вид операции'
                value={transactionType && transactionType.name && transactionType.name}
                onClick={handleClickTransactionType}
                autoComplete='off'
                required={true}
            />
                {
                    (isDropdownListOpen && !clickedOutside) &&
                    <div 
                        ref={dropdownListRef}
                        className='autocomplete-items'
                        onClick={onDropdownListClickInsideHandler}
                    >
                        <ul>
                            {
                                transactionTypes &&
                                transactionTypes.length > 0 ?
                                transactionTypes.filter(item => item.id !== 1).map(item => 
                                    <li 
                                        key={item.id}
                                        onClick={() => handleSelectTransactionTypeId(item)}
                                        title={item.description}
                                    >
                                        {item.name}
                                    </li>
                                ) :
                                <li>Не найдено...</li>
                            }
                        </ul>
                    </div>    
                }
                <input 
                    name='transaction_type_id'
                    type='hidden'
                    placeholder='transaction_type_id'
                    value={transactionType && transactionType.id && transactionType.id}
                    autoComplete='off'
                />
        </label>
    )
}

export default AutocompleteTransactionType;