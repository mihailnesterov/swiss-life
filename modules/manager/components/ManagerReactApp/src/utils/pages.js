/**
 * Возвращает номер из сылки на страницу
 * @param {String} link 
 * @returns Number
 */
export const getPageFromLink = (link) => {
    return Number(link.split('=')[link.split('=').length-1]);
}