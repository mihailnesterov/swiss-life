
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { generateRandomString } from './strings';

/**
 * Возвращает иконку документа в зависимости от расширения файла
 * @param {String} ext 
 * @returns FontAwesomeIcon
 */
export const getIconByFileExt = (ext) => {
    
    let iconName = solid('file');
    let className = 'text-gold';
    
    switch (ext) {
        case 'doc':
            iconName = solid('file-word');
            break;
        case 'docx':
            iconName = solid('file-word');
            break;
        case 'pdf':
            iconName = solid('file-pdf');
            className = 'text-red';
            break;
        default:
            iconName = solid('file');
            className = 'text-gold';
            break;
    }

    return <FontAwesomeIcon 
                size='4x' 
                className={className}
                icon={iconName} 
                title='Скачать'
            />;
}

/**
 * Генерирует имя файла
 * @returns String
 */
export const generateFileName = () => {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${generateRandomString(15)}-${hour}${minutes}${seconds}`;
}