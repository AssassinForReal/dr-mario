export default class Renderer {
  /**
   * @param {HTMLCanvasElement} canvas 
   */
  constructor(canvas) {
    this.canvas = canvas
    this.width = 600
    this.height = 400
    this.context = null
  }

  create() {
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.context = this.canvas.getContext('2d', { alpha: false })
    this.context.textBaseline = 'top'
    this.setFontSize(8)
  }

  /**
   * @returns {CanvasRenderingContext2D}
   */
  getContext() {
    return this.context
  }

  /**
   * @param {string | CanvasGradient | CanvasPattern} color 
   */
  clear(color = '#000') {
    this.context.fillStyle = color
    this.context.fillRect(0, 0, this.width, this.height)
  }

  /**
   * @param {number} size 
   */
  setFontSize(size) {
    this.context.font = `${size}px "Press Start 2P"`
  }

  /**
   * @param {number} checkerSize 
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {string} color 
   */
  fillCheckedRect(checkerSize, x, y, width, height, color = '#fff') {
    this.context.fillStyle = color

    for (let y1 = 0; y1 < height / checkerSize; y1++) {
      for (let x1 = 0; x1 < width / checkerSize; x1++) {
        if ((x1 % 2 == 1 && y1 % 2 == 0) || ((x1 + 1) % 2 == 1 && y1 % 2 == 1)) {
          this.context.fillRect((x + x1) * checkerSize, (y + y1) * checkerSize, checkerSize, checkerSize)
        }
      }
    }
  }

  renderFlippedImage({
    image, sx = undefined, sy = undefined, sWidth = undefined, sHeight = undefined,
    dx, dy, dWidth = undefined, dHeight = undefined,
    flipH = false, flipV = false
  }) {
    this.context.save()

    const scaleH = flipH ? -1 : 1
    const scaleV = flipV ? -1 : 1

    if (dWidth === undefined) dWidth = image.naturalWidth
    if (dHeight === undefined) dHeight = image.naturalHeight

    dx = flipH ? -dx - dWidth : dx
    dy = flipV ? -dy - dHeight : dy

    this.context.scale(scaleH, scaleV)

    if (sx === undefined && sy === undefined && sWidth === undefined && sHeight === undefined) {
      if (dWidth === undefined && dHeight === undefined) {
        this.context.drawImage(image, dx, dy)
      } else {
        this.context.drawImage(image, dx, dy, dWidth, dHeight)
      }
    } else {
      this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }

    this.context.restore()
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {number} radius 
   */
  renderRoundedRect(x, y, width, height, radius) {
    this.context.beginPath()
    this.context.moveTo(x + radius, y)
    this.context.lineTo(x + width - radius, y)
    this.context.quadraticCurveTo(x + width, y, x + width, y + radius)
    this.context.lineTo(x + width, y + height - radius)
    this.context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    this.context.lineTo(x + radius, y + height)
    this.context.quadraticCurveTo(x, y + height, x, y + height - radius)
    this.context.lineTo(x, y + radius)
    this.context.quadraticCurveTo(x, y, x + radius, y)
    this.context.closePath()
    this.context.fill()
  }

  /**
   * @param {string} text 
   * @param {number} x 
   * @param {number} y 
   */
  renderTextCentered(text, x, y) {
    this.context.save()
    this.context.textAlign = 'center'
    this.context.fillText(text, x, y)
    this.context.restore()
  }

  /**
   * @param {HTMLImageElement} image 
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {number} sx 
   * @param {number} sy 
   */
  renderFrame(image, x, y, width, height, sx = 0, sy = 0) {
    // Left
    this.context.drawImage(image, 6 + sx, sy + 0.5, 6, 0.001, x, y + 3, 6, height - 6)

    // Right
    this.context.drawImage(image, 6 + sx, sy + 0.5, 6, 0.001, x + width - 6, y + 3, 6, height - 6)

    // Top
    this.context.drawImage(image, 6.5 + sx, sy, 1, 3, x + 6, y, width - 12, 3)

    // Bottom
    this.context.drawImage(image, 6.5 + sx, sy, 1, 3, x + 6, y + height - 3, width - 12, 3)

    // Top left
    this.context.drawImage(image, 0 + sx, sy, 6, 3, x, y, 6, 3)

    // Bottom right
    this.context.drawImage(image, 6 + sx, sy, 6, 3, x + width - 6, y + height - 3, 6, 3)

    // Bottom left
    this.renderFlippedImage({
      image: image, sx: sx, sy: sy, sWidth: 6, sHeight: 3,
      dx: x, dy: y + height - 3, dWidth: 6, dHeight: 3,
      flipV: true
    })

    // Top right
    this.renderFlippedImage({
      image: image, sx: sx, sy: sy, sWidth: 6, sHeight: 3,
      dx: x + width - 6, dy: y, dWidth: 6, dHeight: 3,
      flipH: true
    })
  }

  destroy() { }
}
