import IllegalInstantiationError from '../error/IllegalInstantiationError.js'

export default class Arrays {
  constructor() {
    throw new IllegalInstantiationError(Arrays)
  }

  /**
   * @param {number} count 
   * @param {Function} callback 
   */
  static times(count, callback) {
    const array = []

    if (typeof count !== 'number') {
      count = parseInt(count)
    }

    for (let i = 0; i < count; i++) {
      array.push(callback(i))
    }
    return array
  }
}
