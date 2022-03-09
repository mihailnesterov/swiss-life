/**
 * Возвращает дату, преобразованную в строку вида:
 * 01.01.2022
 * @param {Date} date 
 * @returns String
 */
export const getDateToString = (date) => {
    return date.split(' ')[0].split('-').reverse().join('.');
}

/**
 * Возвращает время, преобразованную в строку вида:
 * 12:05:27
 * @param {Date} date 
 * @returns String
 */
 export const getTimeToString = (date) => {
    return date.split(' ')[1];
}

/**
 * Возвращает дату/время, преобразованную в строку вида:
 * 01.01.2022 / 12:05:27
 * @param {Date} date 
 * @returns String
 */
 export const getDateTimeToString = (date) => {
    return `${getDateToString(date)} / ${getTimeToString(date)}`;
}