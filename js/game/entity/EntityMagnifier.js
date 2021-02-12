import Renderer from '../../engine/Renderer.js'
import Assets from '../../util/Assets.js'
import Entity from './Entity.js'

export default class EntityMagnifier extends Entity {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    super(x, y)
    this.image = Assets.getImage('magnifier.png')
  }

  /**
   * @param {Renderer} renderer 
   */
  onRender(renderer) {
    const context = renderer.getContext()
    context.fillStyle = '#040404'
    context.beginPath()
    context.ellipse(8 * 7.5, 18.25 * 8, 6 * 8, 5.75 * 8, 0, 0, Math.PI * 2)
    context.fill()
    renderer.getContext().drawImage(this.image, this.x, this.y)
  }
}
