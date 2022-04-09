import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {generateRandomString} from '../../../utils/strings';

const GeneratePasswordBtn = (props) => {

    const {setPassword} = props;

    const onClickHandler = () => setPassword(generateRandomString(15));

    return (
        <button
            className='generate-password'
            type="button"
            onClick={onClickHandler}
            title="Сгенерировать пароль"
        >
            <FontAwesomeIcon icon={solid('key')} />
        </button>
    )
}

export default GeneratePasswordBtn;