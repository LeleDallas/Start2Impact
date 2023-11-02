import { calculateTokenExpireTime } from "./utils";

/**
 * @param {string} cookieName
 * @return {string}
 */
function getCookie(cookieName) {
    const name = cookieName + "=";
    const cookieDecoded = decodeURIComponent(document.cookie);
    const cookieArray = cookieDecoded.split('; ');
    let res;
    cookieArray.forEach(cookie => {
        if (cookie.indexOf(name) === 0)
            res = cookie.substring(name.length);
    })
    return res;
}

/**
 * 
 * @param {string} cookieName 
 * @param {any} cookieValue 
 * @param {number} expireDays
* @return {void}
 */
function setCookie(cookieName, cookieValue, expireDays) {
    const date = new Date();
    date.setTime(calculateTokenExpireTime(expireDays, date));
    const expires = "Expires=" + date.toUTCString();
    document.cookie = `${cookieName}=${JSON.stringify(cookieValue)}; ${expires}; Path=/; Domain=.start2impact.it`;
}

/**
 * @param {number} [expireDays=30]
 * @return {void}
 */
function setUtmCookie(expireDays = 30) {
    const cookieName = 'utm_parameters';
    const url = new URL(window.location);
    const search_params = url.searchParams;
    const existingCookie = JSON.parse(getCookie(cookieName) || '{}');
    const landed_at = new Date().toLocaleString();
    let updated = false;
    search_params.forEach((value, key) => {
        if (key.startsWith('utm_') && value !== existingCookie[key]) {
            existingCookie[key] = value;
            updated = true;
        }
    });

    if (document.referrer && document.referrer !== existingCookie.referrer) {
        existingCookie.referrer = document.referrer;
        updated = true;
    }

    if (updated) {
        existingCookie.landed_at = landed_at;
        setCookie(cookieName, existingCookie, expireDays);
    }
}


setUtmCookie();