import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {generateRandomString} from '../../../utils/strings';
import { t } from '@lingui/macro';

const GeneratePasswordBtn = (props) => {

    const {setPassword} = props;

    const onClickHandler = () => setPassword(generateRandomString(15));

    return (
        <button
            className='generate-password'
            type="button"
            onClick={onClickHandler}
            title={t({
                id: 'Сгенерировать пароль', 
                message: 'Сгенерировать пароль'
            })}
        >
            <FontAwesomeIcon icon={solid('key')} />
        </button>
    )
}

export default GeneratePasswordBtn;