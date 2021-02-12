import Renderer from '../../../engine/Renderer.js'
import Assets from '../../../util/Assets.js'
import Entity from '../Entity.js'

export default class Button extends Entity {
  /**
   * @param {string} text 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(text, x, y) {
    super(x, y)
    this.image = Assets.getImage('button.png')
    this.text = text
    this.active = false
  }

  /**
   * @param {Renderer} renderer 
   */
  onRender(renderer) {
    const context = renderer.getContext()
    const textWidth = context.measureText(this.text).width
    const texCoordY = this.active ? 0 : 3

    renderer.renderFrame(this.image, this.x, this.y, textWidth + 15, 17, 0, texCoordY)
    context.fillStyle = '#6490c8'
    context.fillText(this.text, this.x + 8, this.y + 5)
  }

  /**
   * @param {boolean} active 
   */
  setActive(active) {
    this.active = active
  }
}
