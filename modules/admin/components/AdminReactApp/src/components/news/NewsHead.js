import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 

const NewsHead = () => {
    return (
        <div>
            <h4>Картинка</h4>
            <h4>Заголовок</h4>
            <h4>Анонс</h4>
            <h4>Текст</h4>
            <h4>Дата</h4>
            <h4><FontAwesomeIcon icon={solid('gear')} /></h4>
        </div>
    )
}

export default NewsHead;