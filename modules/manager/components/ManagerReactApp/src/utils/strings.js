/**
 * Генерирует рандомную строку заданной длины
 * @param {Number} length 
 * @returns String
 */
export function generateRandomString(length) {    
    let str = '';
    for ( ; str.length < length; 
        str += Math.random().toString(36).substring(2) );
    return str.substring(0, length);
}(15);