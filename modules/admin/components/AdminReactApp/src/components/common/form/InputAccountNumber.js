import React from 'react';
import GenerateAccountNumberBtn from '../buttons/GenerateAccountNumberBtn';

const InputAccountNumber = (props) => {

    const {accountNumber, setAccountNumber, currencyCode} = props;

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
                currencyCode={currencyCode}
            />
        </div>
    )
}

export default InputAccountNumber;