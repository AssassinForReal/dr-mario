import IllegalInstantiationError from '../../error/IllegalInstantiationError.js'

export default class RandomColor {
  constructor() {
    throw new IllegalInstantiationError(RandomColor)
  }

  static COLOR_LIST = ['blue', 'red', 'yellow']

  /**
   * @returns {string}
   */
  static get() {
    return RandomColor.COLOR_LIST[
      Math.trunc(Math.random() * RandomColor.COLOR_LIST.length)
    ]
  }
}