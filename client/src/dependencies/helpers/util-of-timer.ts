/**
 * Calculates the difference between two dates in minutes, hours, or days.
 * based on https://stackoverflow.com/questions/41948/how-do-i-get-the-difference-between-two-dates-in-javascript
 * @param {any} date1 - The first date.
 * @param {any} date2 - The second date.
 * @param {string} [type='hour'] - The type of difference to calculate ('minute', 'hour', or 'day').
 * @returns {number} - The difference between the two dates in the specified type.
 */
export const differenceOfTwoDate = (date1: any, date2: any, type: string = 'hour'): number => {
  const msMinutes = 60 * 1000
  const msHours = 60 * 60 * 1000
  const msDays = 60 * 60 * 24 * 1000

  const newDate1 = new Date(date1)
  const newDate2 = new Date(date2)
  const diff = newDate2.getTime() - newDate1.getTime()

  let result = 0
  switch (type) {
    case 'minute':
      result = diff / msMinutes
      break
    case 'hour':
      result = diff / msHours
      break
    case 'day':
      result = diff / msDays
      break
  }

  return Math.floor(result)
}

/**
 * Pause execution for a specified number of milliseconds.
 * @param {number} miliseconds - The number of milliseconds to sleep.
 * @returns {Promise<void>} - A Promise that resolves after sleeping for the specified time.
 */
export const sleep = async (miliseconds: number = 15): Promise<void> => {
	return await new Promise((resolve) => setTimeout(resolve, miliseconds))
}

/**
 * Convert a date object into a formatted string with a specified divider.
 * 
 * @param {object} value - The date object containing day, month, and year properties.
 * @param {string} [divider='/'] - The divider used in the date format (default: '/').
 * @returns {string} - The date in string format with the specified divider.
 */
export const getByDateStringRange = (value: any, divider: string = '/'): string => {
  return value?.day?.toString().padStart(2, '0') + divider + value?.month?.toString().padStart(2, '0') + divider + value?.year?.toString()
}

/**
 * Splits a date string in a specific format and converts it to a different format.
 *
 * @param {string} value - The date string in a specific format (e.g., '31/12/2023').
 * @param {string} [divider='/'] - The divider used in the date string (default: '/').
 * @returns {string} - The date in string format with a different divider.
 */
export const getByDateStringSplit = (value: any, divider: string = '/'): string => {
  if (!value) return ''
  const splitters = value?.split(divider)
  if (splitters.length !== 3) return ''
  return splitters[2]?.toString().padStart(2, '0') + divider + splitters[1].toString().padStart(2, '0') + divider + splitters[0]?.toString()
}

/**
 * Create a debounce function that delays invoking a function until after a certain
 * amount of time has passed since the last time it was invoked.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait before invoking `fn`.
 * @param {boolean} immediate - If `true`, `fn` will be invoked immediately on the leading edge.
 * @returns {Function} - The debounced function.
 */
export const debounce = (fn: any, wait: number, immediate: boolean = false): Function => {
  let timeout: any = null
  return function () {
    // @ts-ignore
    const context = this
    // eslint-disable-next-line prefer-rest-params
    const args: any = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      timeout = null
      if (!immediate) fn.apply(context, args)
    }, wait)
    if (immediate && !timeout) fn.apply(context, args)
  }
}

