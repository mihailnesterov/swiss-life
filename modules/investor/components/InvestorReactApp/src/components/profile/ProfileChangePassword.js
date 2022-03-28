import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {setUserPassword} from '../../api/user';
import Spinner from '../common/loader/Spinner';

const ProfileChangePassword = (props) => {

    const {user} = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState(null);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState(null);

    const onNewPasswordChangeHandler = (e) => {
        setNewPassword(e.target.value);
        setStatus(null);
        if( e.target.value === '' )
            setNewPassword(null);
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        setUserPassword(user.id, { password: newPassword })
            .then(res => setStatus(res.statusText))
            .catch(err => console.log(err))
            .finally(() => {
                setSaving(false);
                setNewPassword(null);
            })
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
                            value={newPassword ? newPassword : ''}
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
                    {
                        saving ? 
                        <Spinner size={2} /> : 
                        status && <h4 className='text-green'>{status}!</h4>
                    }
                </fieldset>
                <button disabled={newPassword || saving ? false : true} type='submit'>Сохранить</button>
            </form>
        </div>
    )
}

export default ProfileChangePassword;