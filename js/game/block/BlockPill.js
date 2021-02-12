import Renderer from '../../engine/Renderer.js'
import Assets from '../../util/Assets.js'
import Block from './Block.js'

export default class BlockPill extends Block {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} id
   * @param {string} color 
   */
  constructor(x, y, id, color) {
    super(x, y, color)
    this.id = id
    this.image = Assets.getImage(`pill-${color}.png`)
    this.makeTop()
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  render(renderer, delta, x, y) {
    renderer.getContext().drawImage(
      this.image,
      this.texCoordX, this.texCoordY,
      8, 8,
      x + this.x * 8, y + this.y * 8,
      8, 8
    )
  }

  makeTop() {
    this.texCoordX = 0
    this.texCoordY = 0
  }

  makeBottom() {
    this.texCoordX = 0
    this.texCoordY = 8
  }

  makeLeft() {
    this.texCoordX = 8
    this.texCoordY = 0
  }

  makeRight() {
    this.texCoordX = 16
    this.texCoordY = 0
  }

  makeBall() {
    this.texCoordX = 8
    this.texCoordY = 8
  }

  makeEmpty() {
    this.texCoordX = 16
    this.texCoordY = 8
  }
}
