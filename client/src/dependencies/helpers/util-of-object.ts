/**
 * Retrieves a nested property from an object using a dot-separated path.
 *
 * @param {object} object - The object to retrieve the property from.
 * @param {string} path - The dot-separated path to the desired property.
 * @param {any} [defaultValue=undefined] - The default value to return if the property is not found.
 * @returns {any} - The value of the property or the default value if not found.
 */
const get = (object: any, path: any, defaultValue: any = undefined): any => {
  const travel = (regexp: any) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), object)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === object ? defaultValue : result
}

/**
 * Omit specified keys from an object and return a new object with the remaining keys.
 *
 * @param {object} object - The object from which to omit keys.
 * @param {Array} keys - An array of keys to omit from the object.
 * @param {string} [type='simple'] - The type of omitting operation ('simple' or 'advanced').
 * @returns {object} - A new object with specified keys omitted.
 */
const omit = (object: any, keys: any[], type: string = 'simple'): object => {
  let objectCopy = null
  if (type === 'simple') {
    objectCopy = Object.assign({}, object)
    for (const n of keys) delete objectCopy[n]
  } else {
    const exclude = new Set(keys)
    objectCopy = Object.fromEntries(Object.entries(object).filter((e) => !exclude.has(e[0])))
  }
  return objectCopy
}

/**
 * Create a new object with only the specified keys from the original object.
 *
 * @param {object} object - The source object.
 * @param {Array} keys - An array of keys to pick from the object.
 * @returns {object} - A new object with the specified keys.
 */
const pick = (object: any, keys: any[]): object => {
  return keys.reduce((obj, key) => {
    obj[key] = object[key]
    return obj
  }, {})
}

export { get, omit, pick }
