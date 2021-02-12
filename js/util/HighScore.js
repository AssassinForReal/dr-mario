import IllegalInstantiationError from '../error/IllegalInstantiationError.js'

export default class HighScore {
  constructor() {
    throw new IllegalInstantiationError(HighScore)
  }

  static storageKey = 'mario-game-high-score'

  /**
   * @returns {number}
   */
  static getHighScore() {
    const highScore = localStorage.getItem(HighScore.storageKey)
    if (!highScore) return 0
    return parseInt(highScore)
  }

  /**
   * @param {number} highScore 
   */
  static setHighScore(highScore) {
    localStorage.setItem(HighScore.storageKey, highScore.toString())
  }
}
