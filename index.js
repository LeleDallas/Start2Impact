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
 */
function setCookie(cookieName, cookieValue, expireDays) {
    const date = new Date();
    date.setTime(calculateTokenExpireTime(expireDays, date));
    const expires = "Expires=" + date.toUTCString();
    document.cookie = `${cookieName}=${JSON.stringify(cookieValue)}; ${expires}; Path=/; Domain=.start2impact.it`;
}

function setUtmCookie() {
    const cookieName = 'utm_parameters';
    if (getCookie(cookieName) != undefined) return;
    const url = new URL(window.location);
    const search_params = url.searchParams;
    const utm_campaign = search_params.get('utm_campaign');
    const utm_medium = search_params.get('utm_medium');
    const utm_source = search_params.get('utm_source');
    const expireDays = 30;
    const landed_at = new Date().toLocaleString();
    const cookieValue = { utm_campaign, utm_medium, utm_source, landed_at };
    if (utm_campaign || utm_medium || utm_source) {
        if (!(utm_campaign && utm_medium && utm_source)) {
            console.warn('UTM parameters missing:', { utm_campaign, utm_medium, utm_source });
        }
        setCookie(cookieName, cookieValue, expireDays);
    }
}

setUtmCookie();