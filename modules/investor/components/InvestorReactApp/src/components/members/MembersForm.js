import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createMessage} from '../../api/message';
import FormSent from '../common/form/FormSent';
import { Trans, t } from '@lingui/macro';

const MembersForm = () => {

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [inputMemberNameValue, setMemberNameValue] = useState('');
    const [inputMemberEmailValue, setMemberEmailValue] = useState('');

    const onChangeMemberNameValueHandler = (e) => {
        setMemberNameValue(e.target.value);
    }

    const onChangeMemberEmailValueHandler = (e) => {
        setMemberEmailValue(e.target.value);
    }

    const onIsSentHandler = () => {
        setMemberNameValue('');
        setMemberEmailValue('');
        setIsSent(false);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            createMessage({
                sender_id: user.id,
                receiver_id: user.manager.id,
                theme: t({
                    id: 'Заявка на регистрацию пользователя от представителя', 
                    message: 'Заявка на регистрацию пользователя от представителя'
                }),
                text: t({
                    id: 'member.registration.request', 
                    message: `id представителя: ${user.id}, ФИО представителя: ${user.fullName}, ФИО приглашенного пользователя: ${inputMemberNameValue}, email приглашенного пользователя: ${inputMemberEmailValue}`
                })
            })
                .then(res => {
                    console.log('message created success', res);
                    fetchUserAuthorizedExpanded();
                })
                .catch(err => {
                    console.log('message create error',err);
                    return(
                        <FormSent 
                            header={t({
                                id: 'Ошибка при подаче заявки!', 
                                message: 'Ошибка при подаче заявки!'
                            })}
                            text={
                                <>
                                    <p><Trans>Попробуйте оформить заявку еще раз.</Trans></p>
                                    <p><Trans>В случае повторной ошибки обратитесь к менеджеру по телефону или электронной почте.</Trans></p>
                                </>
                            }
                            onOk={onIsSentHandler}
                        />
                    );
                })
                .finally(() => {
                    setSending(false);
                    setIsSent(true);
                });
        }, 1000);
    }

    if(isSent) {
        return(
            <FormSent 
                header={t({
                    id: 'Заявка отправлена', 
                    message: 'Заявка отправлена'
                })}
                text={t({
                    id: 'В ближайшее время наш менеджер свяжется с Вами', 
                    message: 'В ближайшее время наш менеджер свяжется с Вами'
                })}
                onOk={onIsSentHandler}
            />
        );
    }

    return (
        <div className='form-container'>
            {
                (loading || sending) ?
                <Spinner size={2} /> :
                <form onSubmit={onSubmitHandler}>
                    
                    <h3><Trans>Пригласить пользователя</Trans></h3>
                    
                    <fieldset>

                        <label htmlFor="member-name">
                            <input 
                                id="member-name"
                                type='text'
                                placeholder={t({
                                    id: 'ФИО пользователя', 
                                    message: 'ФИО пользователя'
                                })}
                                value={inputMemberNameValue}
                                onChange={onChangeMemberNameValueHandler}
                                autoComplete='off'
                            />
                        </label>

                        <label htmlFor="member-email">
                            <input 
                                id="member-email"
                                type='text'
                                placeholder={t({
                                    id: 'Email пользователя', 
                                    message: 'Email пользователя'
                                })}
                                value={inputMemberEmailValue}
                                onChange={onChangeMemberEmailValueHandler}
                                autoComplete='off'
                            />
                        </label>

                    </fieldset>

                    <hr />

                    <button 
                        type='submit' 
                        disabled={
                            (
                                inputMemberNameValue === '' || 
                                inputMemberEmailValue === '' 
                            ) ? 
                            true : 
                            false
                        }
                    ><Trans>Отправить заявку</Trans></button>

                </form>
            }
        </div>
    )
}

export default MembersForm;