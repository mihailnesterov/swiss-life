import { toast } from 'react-toastify';

const defaultPosition = toast.POSITION.BOTTOM_RIGHT;
const defaultTheme = "dark";
const defaultClassName = "bg-black";

/**
 * Сообщение success
 * @param {String} title 
 * @param {Object} res 
 */
 export const getToastSuccess = (title, res) => {
    console.log(title,res)
    toast.success(title, {
        position: defaultPosition,
        theme: defaultTheme,
        className: defaultClassName
    });
}

/**
 * Сообщение error
 * @param {String} title 
 * @param {Object} res 
 */
export const getToastError = (title, err) => {
    console.log(title,err)
    toast.error(title, {
        position: defaultPosition,
        theme: defaultTheme,
        className: defaultClassName
    });
}