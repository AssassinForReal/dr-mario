import IllegalInstantiationError from '../error/IllegalInstantiationError.js'

export default class Colors {
  constructor() {
    throw new IllegalInstantiationError(Colors)
  }

  static REGEX_COLOR_HEX_RGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

  /**
   * @param {number} red 
   * @param {number} green 
   * @param {number} blue 
   * @param {number} alpha 
   */
  static fromRGB(red, green, blue, alpha = 0xff) {
    return (
      ((red & 0xff) << 24) |
      ((green & 0xff) << 16) |
      ((blue & 0xff) << 8) |
      alpha & 0xff
    )
  }

  /**
   * @param {number} color 
   */
  static toRGB(color) {
    return [
      color >> 24 & 0xff,
      color >> 16 & 0xff,
      color >> 8 & 0xff,
      color & 0xff
    ]
  }

  /**
   * @param {string} hex 
   */
  static fromHex(hex) {
    const result = Colors.REGEX_COLOR_HEX_RGB.exec(hex)
    return Colors.fromRGB(
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    )
  }
}
