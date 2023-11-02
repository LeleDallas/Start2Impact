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
    const utm_campaign = search_params.get('utm_campaign');
    const utm_medium = search_params.get('utm_medium');
    const utm_source = search_params.get('utm_source');
    const landed_at = new Date().toLocaleString();
    const existingCookie = JSON.parse(getCookie(cookieName) || '{}');

    if ((utm_campaign || utm_medium || utm_source)
        && (!existingCookie.utm_campaign ||
            existingCookie.utm_campaign !== utm_campaign ||
            existingCookie.utm_medium !== utm_medium ||
            existingCookie.utm_source !== utm_source
        )) {
        const cookieValue = {
            utm_campaign,
            utm_medium,
            utm_source,
            landed_at
        };
        setCookie(cookieName, cookieValue, expireDays);
    }

    const referrer = document.referrer;
    if (referrer && referrer !== existingCookie.referrer) {
        existingCookie.referrer = referrer;
        setCookie(cookieName, existingCookie, expireDays);
    }
}


setUtmCookie();