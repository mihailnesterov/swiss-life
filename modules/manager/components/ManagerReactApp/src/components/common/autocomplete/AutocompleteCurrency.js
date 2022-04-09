import React, { useEffect } from 'react';

const AutocompleteCurrency = (props) => {

    const {setParams, params, currency} = props;

    useEffect(() => {
        if(currency && currency.id) {
            setParams({
                'currency_id':Number(currency.id),
                ...params
            });
        } else {
            setParams({...params});
        }
    }, [currency]);

    return (
        <label htmlFor="currencies">
            <p><small>Валюта</small></p>
            <input 
                name='currencies'
                type='text'
                placeholder='Выберите счет'
                value={(currency && currency.shortName) ? `${currency.sign} ${currency.shortName}` : ''}
                onChange={() => console.log(currency)}
                autoComplete='off'
                disabled={true}
            />
            <input 
                name='currency_id'
                type='hidden'
                placeholder='currency_id'
                value={(currency && currency.id) ? currency.id : ''}
                autoComplete='off'
            />
        </label>
    )
}

export default AutocompleteCurrency;