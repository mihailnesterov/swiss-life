import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 

const SeminarsHead = () => {
    return (
        <div>
            <h4>Картинка</h4>
            <h4>Название</h4>
            <h4>Описание</h4>
            <h4>Дата</h4>
            <h4>Время</h4>
            <h4>Ссылка</h4>
            <h4><FontAwesomeIcon icon={solid('gear')} /></h4>
        </div>
    )
}

export default SeminarsHead;