const milliSecondsInDay = 24 * 60 * 60 * 1000

/**
 * @param {number} expireDays
 * @param {Date} date
 * @return {number}
 */
 
export const calculateTokenExpireTime = (expireDays, date) => expireDays * milliSecondsInDay + date.getTime()
