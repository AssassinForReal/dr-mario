import Renderer from '../../../engine/Renderer.js'
import Assets from '../../../util/Assets.js'
import Entity from '../Entity.js'

export default class Range extends Entity {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y, { value = 0, min = 0, max = 10, step = 1 }) {
    super(x, y)
    this.imageTag = Assets.getImage('tag.png')
    this.min = min
    this.max = max
    this.step = step
    this.value = value
  }

  /**
   * @param {Renderer} renderer 
   */
  onRender(renderer) {
    const context = renderer.getContext()
    let ribs = (this.max - this.min + 1) / this.step
    let spacing = 8
    let width = ribs * spacing + spacing / 4

    context.fillStyle = '#e8d97a'
    context.fillRect(this.x, this.y + 2, width, 1)

    for (let i = 0; i < ribs; i++) {
      context.fillRect(this.x + (i + 1) * spacing - spacing / 2, this.y, 2, 5)
    }

    context.drawImage(this.imageTag, this.x + (this.value / this.step + 1) * spacing - spacing / 2 - 2, this.y - 10)
  }

  increment() {
    if (this.value < this.max) {
      this.value = Math.min(this.max, this.value + this.step)
    }
  }

  decrement() {
    if (this.value > this.min) {
      this.value = Math.max(0, this.value - this.step)
    }
  }
}
