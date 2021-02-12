import Renderer from '../../engine/Renderer.js'
import Assets from '../../util/Assets.js'
import EntityColored from './EntityColored.js'

export default class EntityFrame extends EntityColored {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   */
  constructor(x, y, width, height) {
    super(x, y, 'frame.png')
    this.width = width
    this.height = height
    this.setTexCoords(0, 0)
  }

  /**
   * @param {Renderer} renderer 
   */
  onRender(renderer) {
    const context = renderer.getContext()
    context.fillStyle = '#040404'
    context.fillRect(this.x, this.y, this.width, this.height)
    renderer.renderFrame(this.image, this.x, this.y + 2, this.width - 2, this.height - 5, this.texCoordX, this.texCoordY)
  }

  /**
   * @param {number} x 
   * @param {number} y 
   */
  setTexCoords(x, y) {
    this.texCoordX = x
    this.texCoordY = y
  }

  /**
   * @param {string} imageName 
   */
  setImage(imageName) {
    this.image = Assets.getImage(imageName)
  }
}
