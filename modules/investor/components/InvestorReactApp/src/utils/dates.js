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

/**
 * Возвращает дату/время, преобразованную в строку вида:
 * 2022-01-01T15:25
 * @param {Date} date 
 * @returns String
 */
 export const getDateTimeLocal = (dateStr) => {
    const date = new Date(dateStr);
    const dateObj = {
        year: getYear(date),
        month: getMonth(date),
        day: getDay(date),
        hour: getHours(date),
        minutes: getMinutes(date),
        seconds: getSeconds(date)
    }
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}T${dateObj.hour}:${dateObj.minutes}`;
}

/**
 * Получаем отформатированные дату,время с добавленным 0, в случае, если дата/время < 10
 * @param {Date} date 
 * @returns String
 */
const getYear = date => date.getFullYear();
const getMonth = date => (date.getMonth()+1) < 10 ? `0${date.getMonth()+1}` : (date.getMonth()+1);
const getDay = date => date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
const getHours = date => date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
const getMinutes = date => date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
const getSeconds = date => date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

/**
 * Возвращает дату в timestamp
 * @param {Date} date 
 * @returns Timestamp
 */
export const getDateToTimestamp = date => Date.parse(date)/1000;