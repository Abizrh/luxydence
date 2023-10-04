/**
 * Converts a string from camelCase to kebab-case.
 * based on https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
 * 
 * @param {string} text - The input string in camelCase.
 * @returns {string} - The string converted to kebab-case.
 */
export const toKebabCase = (text: string): string =>
  text
    .replace(/\W+/g, '-')
    .replace(/((?<=[a-z\d])[A-Z]|(?<=[A-Z\d])[A-Z](?=[a-z]))/g, '-$1')
    .toLowerCase()

/**
 * Converts a string to kebab-case.
 * based on https://www.geeksforgeeks.org/how-to-convert-a-string-into-kebab-case-using-javascript/
 *
 * @param {string} text - The input string.
 * @returns {string} - The string converted to kebab-case.
 */
export const toKebabCaseSecond = (text: string): string =>
  text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
