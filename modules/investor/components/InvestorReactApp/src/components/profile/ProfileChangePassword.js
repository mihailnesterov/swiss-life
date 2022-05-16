import React, {useState} from 'react';
import {setUserPassword} from '../../api/user';
import InputPassword from '../common/form/InputPassword';
import Spinner from '../common/loader/Spinner';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import { Trans, t } from '@lingui/macro';

const ProfileChangePassword = (props) => {

    const {user} = props;

    const [newPassword, setNewPassword] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        setUserPassword(user.id, { password: newPassword })
            .then(res => getToastSuccess(t({
                id: 'Пароль сохранен!', 
                message: 'Пароль сохранен!'
            }), res))
            .catch(err => getToastError(t({
                id: 'Ошибка при сохранении пароля!', 
                message: 'Ошибка при сохранении пароля!'
            }), err))
            .finally(() => {
                setSaving(false);
                setNewPassword(null);
            })
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm}>
                <h3><Trans>Изменить пароль</Trans></h3>
                <fieldset>
                    <InputPassword
                        password={newPassword}
                        setPassword={setNewPassword}
                    />
                </fieldset>
                <fieldset>
                    <button disabled={newPassword || saving ? false : true} type='submit'><Trans>Сохранить</Trans></button>
                    {saving && <Spinner size={2} />}
                </fieldset>
            </form>
        </div>
    )
}

export default ProfileChangePassword;