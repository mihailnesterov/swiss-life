import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 

const InvestmentHead = () => {
    return (
        <div>
            <h4>Картинка</h4>
            <h4>Название</h4>
            <h4>Краткое описание</h4>
            <h4>Описание</h4>
            <h4>Категория</h4>
            <h4>Калькуляция</h4>
            <h4>Статус</h4>
            <h4><FontAwesomeIcon icon={solid('gear')} /></h4>
        </div>
    )
}

export default InvestmentHead;