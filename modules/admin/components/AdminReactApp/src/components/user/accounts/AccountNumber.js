import React from 'react';
import GenerateAccountNumberBtn from './GenerateAccountNumberBtn';

const AccountNumber = (props) => {

    const {accountNumber, setAccountNumber, currency} = props;

    const onChangeHandler = (e) => {
        setAccountNumber(e.target.value === '' ? null : e.target.value);
    }

    return (
        <div className='input-account-number'>
            <input 
                name='number'
                type='text'
                placeholder='№ счета'
                value={accountNumber ? accountNumber : ''}
                onChange={onChangeHandler}
                autoComplete='off'
                required={true}
            />
            <GenerateAccountNumberBtn
                setAccountNumber={setAccountNumber}
                currency={currency}
            />
        </div>
    )
}

export default AccountNumber;