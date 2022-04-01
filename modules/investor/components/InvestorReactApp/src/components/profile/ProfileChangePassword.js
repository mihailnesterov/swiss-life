import React, {useState} from 'react';
import {setUserPassword} from '../../api/user';
import Spinner from '../common/loader/Spinner';
import InputPassword from '../common/form/InputPassword';

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