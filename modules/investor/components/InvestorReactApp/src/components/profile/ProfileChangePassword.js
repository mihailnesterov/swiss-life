import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const ProfileChangePassword = (props) => {

    const {user} = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState(null);

    const onNewPasswordChangeHandler = (e) => {
        setNewPassword(e.target.value);
        if( e.target.value === '' )
            setNewPassword(null);
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        setNewPassword(null);
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm}>
                <h3>Изменить пароль</h3>
                <fieldset>
                    <div className='input-change-password'>
                        <input 
                            type={!isPasswordVisible ? "password" : "text"}
                            placeholder='Новый пароль'
                            onChange={onNewPasswordChangeHandler}
                            autoComplete='off'
                        />
                        <button
                            type="button"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            title={!isPasswordVisible ? "Показать пароль" : "Скрыть пароль"}
                        >
                            {
                                isPasswordVisible ?
                                <FontAwesomeIcon icon={solid('eye-slash')} /> :
                                <FontAwesomeIcon icon={solid('eye')} />
                            }
                        </button>
                    </div>
                </fieldset>
                <button disabled={newPassword ? false : true} type='submit'>Сохранить</button>
            </form>
        </div>
    )
}

export default ProfileChangePassword;