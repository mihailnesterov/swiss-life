import React, {useState} from 'react';
import { useActions } from '../../hooks/useActions';
import GoBackBtn from '../common/buttons/GoBackBtn';
import {setUserPassword} from '../../api/user';
import InputPassword from '../common/form/InputPassword';
import Spinner from '../common/loader/Spinner';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {setPageTitle} from '../../utils/navbar';
import { Trans, t } from '@lingui/macro';

const ProfileChangePassword = (props) => {

    const {user} = props;

    const {fetchUserAuthorizedExpanded} = useActions();

    const [newPassword, setNewPassword] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        setLoading(true);
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
                setLoading(false);
                setNewPassword(null);
                fetchUserAuthorizedExpanded();
            })
    };

    return (
        <>
            <div
                onClick={() => setPageTitle(t({
                    id: 'Мой профиль', 
                    message: 'Мой профиль'
                }))}
            >
                <GoBackBtn
                    url='profile'
                    title={t({
                        id: 'Вернуться в профиль', 
                        message: 'Вернуться в профиль'
                    })}
                />
            </div>
            <div>
                <h1><Trans>Изменить пароль</Trans></h1>
            </div>
            {
                loading ?
                <Spinner size={2} /> :
                <div className='form-container'>
                    <form onSubmit={handleSubmitForm}>
                        <fieldset>
                            <InputPassword
                                password={newPassword}
                                setPassword={setNewPassword}
                            />
                        </fieldset>
                        <fieldset>
                            <button
                                type='submit'
                                disabled={newPassword || saving ? false : true}
                                className='btn btn-gold'
                            >
                                <Trans>Сохранить</Trans>
                            </button>
                            {saving && <Spinner size={2} />}
                        </fieldset>
                    </form>
                </div>
            }
        </>
    )
}

export default ProfileChangePassword;