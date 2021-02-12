import Renderer from '../../engine/Renderer.js'
import Assets from '../../util/Assets.js'
import Settings from '../../util/Settings.js'
import Collider from '../block/Collider.js'
import Entity from './Entity.js'

export default class EntityPill extends Entity {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} id
   */
  constructor(x, y, id) {
    super(x, y)
    this.id = id
    this.rotation = 0
    this.colors = []
    this.images = []
    this.speed = Settings.getSpeed() + 1.5
  }

  /**
   * @param {string} color1 
   * @param {string} color2 
   */
  setColors(color1, color2) {
    this.colors = [color1, color2]
    this.images = [
      Assets.getImage(`pill-${color1}.png`),
      Assets.getImage(`pill-${color2}.png`),
    ]
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} x 
   * @param {number} y 
   */
  onRender(renderer, x, y) {
    const context = renderer.getContext()

    if (this.rotation == 0) {
      context.drawImage(this.images[0], 8, 0, 8, 8, x + this.x * 8, y + this.y * 8, 8, 8)
      context.drawImage(this.images[1], 16, 0, 8, 8, x + (this.x + 1) * 8, y + this.y * 8, 8, 8)
    }

    else if (this.rotation == 1) {
      context.drawImage(this.images[0], 0, 8, 8, 8, x + this.x * 8, y + this.y * 8, 8, 8)
      context.drawImage(this.images[1], 0, 0, 8, 8, x + this.x * 8, y + (this.y - 1) * 8, 8, 8)
    }

    else if (this.rotation == 2) {
      context.drawImage(this.images[1], 8, 0, 8, 8, x + this.x * 8, y + this.y * 8, 8, 8)
      context.drawImage(this.images[0], 16, 0, 8, 8, x + (this.x + 1) * 8, y + this.y * 8, 8, 8)
    }

    else if (this.rotation == 3) {
      context.drawImage(this.images[1], 0, 8, 8, 8, x + this.x * 8, y + this.y * 8, 8, 8)
      context.drawImage(this.images[0], 0, 0, 8, 8, x + this.x * 8, y + (this.y - 1) * 8, 8, 8)
    }
  }

  /**
   * @param {number} rotation 
   */
  setRotation(rotation) {
    this.rotation = rotation

    if (this.rotation < 0) {
      this.rotation = 3
    }

    else if (this.rotation > 3) {
      this.rotation = 0
    }
  }

  rotateLeft() {
    this.setRotation(this.rotation + 1)
  }

  rotateRight() {
    this.setRotation(this.rotation - 1)
  }
  
  /**
   * @returns {Collider}
   */
  getCollider() {
    let x = this.x
    let y = 0
    let width = 0
    let height = 0

    if (this.rotation == 0 || this.rotation == 2) {
      y = this.y
      width = 2
      height = 1
    } else {
      width = 1
      height = 2
      y = this.y - 1
    }

    return new Collider(x, y, width, height)
  }
}
