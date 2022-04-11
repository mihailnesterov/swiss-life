import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const ShowPasswordBtn = (props) => {

    const {isPasswordVisible, setPasswordVisible} = props;

    const onClickHandler = () => setPasswordVisible(!isPasswordVisible);

    return (
        <button
            className='show-password'
            type="button"
            onClick={onClickHandler}
            title={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
        >
            {
                isPasswordVisible ?
                <FontAwesomeIcon icon={solid('eye-slash')} /> :
                <FontAwesomeIcon icon={solid('eye')} />
            }
        </button>
    )
}

export default ShowPasswordBtn;