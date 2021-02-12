import IllegalInstantiationError from '../../error/IllegalInstantiationError.js'

export default class LevelColors {
  constructor() {
    throw new IllegalInstantiationError(LevelColors)
  }

  static COLORS = [
    '#782a66',
    '#3c8329',
    '#e99fa9',
    '#7b7b7b',
    '#1a4e82'
  ]

  /**
   * @param {number} level 
   */
  static getLevelColor(level) {
    return LevelColors.COLORS[level % LevelColors.COLORS.length]
  }
}
