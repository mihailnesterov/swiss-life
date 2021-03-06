import React, {useState} from 'react';
import GeneratePasswordBtn from '../buttons/GeneratePasswordBtn';
import ShowPasswordBtn from '../buttons/ShowPasswordBtn';

const InputPassword = (props) => {

    const {password, setPassword} = props;

    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const onChangeHandler = (e) => {
        setPassword(e.target.value === '' ? null : e.target.value);
    }

    return (
        <div className='input-password'>
            <input 
                type={!isPasswordVisible ? "password" : "text"}
                placeholder='Введите пароль'
                value={password ? password : ''}
                onChange={onChangeHandler}
                autoComplete='off'
            />
            <GeneratePasswordBtn
                setPassword={setPassword}
            />
            <ShowPasswordBtn
                isPasswordVisible={isPasswordVisible}
                setPasswordVisible={setPasswordVisible}
            />
        </div>
    )
}

export default InputPassword;