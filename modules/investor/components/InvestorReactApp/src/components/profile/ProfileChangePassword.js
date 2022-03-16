import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const ProfileChangePassword = (props) => {

    const {user} = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className='form-container'>
            <form>
                <h3>Изменить пароль</h3>
                <fieldset>
                    <div className='input-change-password'>
                        <input 
                            type={!isPasswordVisible ? "password" : "text"}
                            placeholder='Новый пароль'
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
                <button type='submit'>Сохранить</button>
            </form>
        </div>
    )
}

export default ProfileChangePassword;