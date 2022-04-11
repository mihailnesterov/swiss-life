import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {generateRandomString} from '../../../utils/strings';

const generateAccountNumber = (currencyCode) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const dateString = `${year}${month}${day}`;
    const randomString = generateRandomString(6);

    return `${dateString}-${randomString}-${currencyCode}`;
}

const GenerateAccountNumberBtn = (props) => {

    const {setAccountNumber, currencyCode} = props;

    const onClickHandler = () => setAccountNumber(generateAccountNumber(currencyCode));

    return (
        <button
            className='generate-account-number'
            type="button"
            onClick={onClickHandler}
            onLoad={onClickHandler}
            title="Сгенерировать номер счета"
            disabled={currencyCode ? false : true}
        >
            <FontAwesomeIcon icon={solid('recycle')} />
        </button>
    )
}

export default GenerateAccountNumberBtn;