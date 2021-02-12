import Renderer from '../../engine/Renderer.js'
import EntityColored from './EntityColored.js'

export default class EntityJar extends EntityColored {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    super(x, y, 'jar.png')
  }

  /**
   * @param {Renderer} renderer 
   */
  onRender(renderer) {
    const context = renderer.getContext()
    context.fillStyle = '#040404'
    context.fillRect(this.x, this.y + 8 * 3, 8 * 12, 8 * 18)
    context.fillRect(this.x + 8 * 2, this.y, 8 * 8, 8 * 3)
    renderer.getContext().drawImage(this.image, this.x, this.y)
  }
}
