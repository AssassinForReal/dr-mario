import Renderer from '../../engine/Renderer.js'
import Collider from './Collider.js'

export default class Block {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {string} color 
   */
  constructor(x, y, color) {
    this.setPosition(x, y)
    this.color = color
    this.markedToRemove = false
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  render(renderer, delta, x, y) { }

  /**
   * @returns {Collider}
   */
  getCollider() {
    return new Collider(this.x, this.y, 1, 1)
  }

  /**
   * @param {number} x 
   * @param {number} y 
   */
  setPosition(x, y) {
    this.x = x
    this.y = y
  }
}
