import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 

const UsersHead = () => {
    return (
        <div>
            <h4>ID</h4>
            <h4>Фото</h4>
            <h4>ФИО</h4>
            <h4>Email</h4>
            <h4>Телефон</h4>
            <h4>Активен</h4>
            <h4>Верифицирован</h4>
            <h4>Представитель</h4>
            <h4>Статус</h4>
            <h4>Дата регистрации</h4>
            <h4><FontAwesomeIcon icon={solid('gear')} /></h4>
        </div>
    )
}

export default UsersHead;