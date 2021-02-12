import Renderer from '../../engine/Renderer.js'
import Assets from '../../util/Assets.js'
import Entity from './Entity.js'

export default class EntityClipboard extends Entity {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {number} clipWidth 
   */
  constructor(x, y, width, height, clipWidth) {
    super(x, y)
    this.width = width
    this.height = height
    this.clipWidth = clipWidth
    this.image = Assets.getImage('clipboard.png')
    this.lines = []
  }

  /**
   * @param {Renderer} renderer 
   */
  onRender(renderer) {
    const context = renderer.getContext()

    // Background
    context.fillStyle = '#000'
    context.fillRect(this.x, this.y, this.width, this.height)

    // Top
    context.fillStyle = '#e8d97a'
    context.fillRect(this.x + 2, this.y, this.width - 2, 3)

    // Left
    context.fillRect(this.x + 2, this.y, 6, this.height - 7)

    // Right
    context.fillRect(this.x + this.width - 6, this.y, 6, this.height - 7)

    // Bottom left
    context.drawImage(this.image, 9, 0, 6, 4, this.x + 2, this.y + this.height - 7, 6, 4)

    // Bottom
    context.drawImage(this.image, 12, 0, 2, 4, this.x + 7, this.y + this.height - 7, this.width - 7, 4)

    // Clip background
    let clipX = this.x + this.width / 2 - this.clipWidth / 2
    let clipY = this.y - 8
    context.fillStyle = '#000'
    context.fillRect(clipX + 2, clipY, this.clipWidth - 4, 8 * 2)

    // Clip left
    context.drawImage(this.image, 0, 0, 9, 14, clipX + 2, clipY + 1, 9, 14)

    // Clip right
    renderer.renderFlippedImage({
      image: this.image,
      sx: 0, sy: 0, sWidth: 9, sHeight: 14,
      dx: clipX + this.clipWidth - 11, dy: clipY + 1, dWidth: 9, dHeight: 14,
      flipH: true
    })

    // Clip through
    context.drawImage(this.image, 7, 0, 1, 14, clipX + 10, clipY + 1, this.clipWidth - 20, 14)

    // Lines
    context.fillStyle = '#6490c8'

    this.lines.forEach((line, index) => {
      context.fillText(line, this.x + 9, this.y + 8 + 8 * index, this.width - 16)
    })
  }

  /**
   * @param {number} index 
   * @param {string} text 
   */
  setLine(index, text) {
    this.lines[index] = text
  }
}
