import IllegalInstantiationError from '../error/IllegalInstantiationError.js'
import Numbers from '../util/Numbers.js'

export default class Debug {
  constructor() {
    throw new IllegalInstantiationError(Debug)
  }

  static debug = true

  /**
   * @param {string} message 
   */
  static log(message) {
    if (Debug.debug) {
      const date = new Date()
      const hours = Numbers.formatNumber(date.getHours(), 2)
      const minutes = Numbers.formatNumber(date.getMinutes(), 2)
      const seconds = Numbers.formatNumber(date.getSeconds(), 2)

      console.log(`[${hours}:${minutes}:${seconds}] ${message}`)
    }
  }

  /**
   * @param {string} message 
   */
  static info(message) {
    Debug.log(`[INFO] ${message}`)
  }

  /**
   * @param {string} message 
   */
  static warn(message) {
    Debug.log(`[WARNING] ${message}`)
  }

  /**
   * @param {string} message 
   */
  static error(message) {
    Debug.log(`[ERROR] ${message}`)
  }
}
