import React, {useState} from 'react';
import {setUserPassword} from '../../api/user';
import InputPassword from '../common/form/InputPassword';
import Saving from '../common/loader/Saving';

const ProfileChangePassword = (props) => {

    const {user} = props;

    const [newPassword, setNewPassword] = useState(null);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState(null);

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
                    <InputPassword
                        password={newPassword}
                        setPassword={setNewPassword}
                        setStatus={setStatus}
                    />
                    <Saving 
                        saving={saving}
                        text={status}
                    />
                </fieldset>
                <button disabled={newPassword || saving ? false : true} type='submit'>Сохранить</button>
            </form>
        </div>
    )
}

export default ProfileChangePassword;