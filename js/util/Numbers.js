import IllegalArgumentError from '../error/IllegalArgumentError.js'
import IllegalInstantiationError from '../error/IllegalInstantiationError.js'

export default class Numbers {
  constructor() {
    throw new IllegalInstantiationError(Numbers)
  }

  /**
   * @param {number} number 
   * @param {number} digits
   * @returns {string}
   */
  static formatNumber(number, digits) {
    const digitCount = number === 0 ? 1 : Math.floor(Math.log10(Math.abs(number)) + 1)
    let string = ''

    digits = Math.max(digitCount, digits)

    for (let i = 0; i < digits; i++) {
      const currentDigit = Math.floor(Math.abs(number) / 10 ** (digits - i - 1)) % 10
      string += currentDigit.toString()
    }

    return (number < 0 ? '-' : '') + string
  }

  /**
   * @param {number} number 
   * @param {number} min 
   * @param {number} max 
   * @param {boolean} isInt 
   * 
   * @returns {number}
   */
  static limitNumber(number, min, max, isInt = false) {
    if (min > max) {
      throw new IllegalArgumentError('min cannot be greater than max')
    }

    number = Math.max(Math.min(number, max), min)

    if (isInt) {
      number = Math.trunc(number)
    }

    return number
  }

  /**
   * @param {number} angle 
   */
  static toRadians(angle) {
    return angle * Math.PI / 180
  }

  /**
   * @param {number} angle 
   */
  static toDegrees(angle) {
    return angle * 180 / Math.PI
  }

  /**
   * @param {number} min 
   * @param {number} max 
   * @returns {number}
   */
  static randomFloat(min, max) {
    return Math.random() * (max - min + 1) + min
  }

  /**
   * @param {number} min 
   * @param {number} max 
   * @returns {number}
   */
  static randomInt(min, max) {
    return Math.trunc(Numbers.randomFloat(min, max))
  }
}
