import React, {useState} from 'react';
import {setUserPassword} from '../../api/user';
import InputPassword from '../common/form/InputPassword';
import Spinner from '../common/loader/Spinner';
import {getToastSuccess, getToastError} from '../../utils/toasts';

const ProfileChangePassword = (props) => {

    const {user} = props;

    const [newPassword, setNewPassword] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        setUserPassword(user.id, { password: newPassword })
            .then(res => getToastSuccess('Пароль сохранен!', res))
            .catch(err => getToastError('Ошибка при сохранении пароля!', err))
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
                    <InputPassword
                        password={newPassword}
                        setPassword={setNewPassword}
                    />
                </fieldset>
                <fieldset>
                    <button disabled={newPassword || saving ? false : true} type='submit'>Сохранить</button>
                    {saving && <Spinner size={2} />}
                </fieldset>
            </form>
        </div>
    )
}

export default ProfileChangePassword;