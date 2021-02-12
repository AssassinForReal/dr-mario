export default class IllegalInstantiationError extends Error {
  /**
   * @param {Function} clazz 
   */
  constructor(clazz) {
    super(`Cannot instantiate: ${clazz.name}`)
  }
}
