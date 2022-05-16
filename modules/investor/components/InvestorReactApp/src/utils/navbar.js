import { t } from "@lingui/macro";

/**
 * Выбор активного пункта меню
 * @param {Array} routes 
 * @param {String} currPathname 
 * @returns {Object} itemActive
 */
 export const getInitialItemActive = (routes, currPathname) => {
    let itemActive = 1;

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if(route.path === currPathname) {
            itemActive = route.id;
            setPageTitle(route.title)
            break;
        }
    }

    return itemActive;
}

/**
 * Установить заголовок страницы
 * @param {String} title
 */
export const setPageTitle = (title) => document.title = t({id: title, message: title});