import Assets from '../../util/Assets.js'
import Colors from '../../util/Colors.js'
import Images from '../../util/Images.js'
import Entity from './Entity.js'

export default class EntityColored extends Entity {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {string} rawImageName
   */
  constructor(x, y, rawImageName) {
    super(x, y)
    this.maskColor = Colors.fromHex('#ff00ff')
    this.rawImage = Assets.getImage(rawImageName)
    this.image = this.rawImage
  }

  /**
   * @param {string} color 
   */
  setColor(color) {
    this.color = color
    this.image = Images.replaceColor(
      this.rawImage,
      this.maskColor,
      Colors.fromHex(color)
    )
  }
}
