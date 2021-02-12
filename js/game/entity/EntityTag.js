import Renderer from '../../engine/Renderer.js'
import Assets from '../../util/Assets.js'
import Entity from './Entity.js'

export default class EntityTag extends Entity {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    super(x, y)
    this.image = Assets.getImage('tag.png')
  }

  /**
   * @param {Renderer} renderer 
   */
  onRender(renderer) {
    renderer.getContext().drawImage(this.image, this.x, this.y)
  }
}
