import Renderer from '../../engine/Renderer.js'
import Assets from '../../util/Assets.js'
import Entity from './Entity.js'

export default class EntityMario extends Entity {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    super(x, y)
    this.width = 56
    this.height = 48
    this.image = Assets.getImage('mario.png')
    this.handUp()
  }

  /**
   * @param {Renderer} renderer 
   */
  onRender(renderer) {
    renderer.getContext().drawImage(
      this.image,
      this.texCoordX, this.texCoordY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    )
  }

  makeTPose() {
    this.texCoordX = this.width
    this.texCoordY = this.height
  }

  handUp() {
    this.texCoordX = 0
    this.texCoordY = 0
  }

  handDown() {
    this.texCoordX = 0
    this.texCoordY = this.height
  }

  handMiddle() {
    this.texCoordX = this.width
    this.texCoordY = 0
  }
}
