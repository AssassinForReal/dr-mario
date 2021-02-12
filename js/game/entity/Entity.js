import Renderer from '../../engine/Renderer.js'

export default class Entity {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x
    this.y = y
    this.visible = true
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} x
   * @param {number} y
   */
  render(renderer, x = 0, y = 0) {
    if (this.visible) {
      this.onRender(renderer, x, y)
    }
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} x
   * @param {number} y
   */
  onRender(renderer, x, y) { }

  /**
   * @param {number} x 
   * @param {number} y 
   */
  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * @param {boolean} visible 
   */
  setVisible(visible) {
    this.visible = visible
  }
}
