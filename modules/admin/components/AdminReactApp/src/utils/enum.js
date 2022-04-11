/**
* Enum - функция, реализующая enum (перечисление)
* @see https://myrusakov.ru/js-enum-type.html
* @param obj {object}
* @returns result {object} immutable object
*/
const Enum = ( obj ) => {
    const result = {};

    for( const prop in obj ) {
        if ( obj.hasOwnProperty(prop) ) {
            result[prop] = obj[prop];
        }
    }
    return Object.freeze(result);
}

export default Enum;