import BrowserEngine from '../app/BrowserEngine.js'

export default class Display {
  /**
   * @param {HTMLCanvasElement} canvas 
   */
  constructor(canvas) {
    this.canvas = canvas
    this.width = 600
    this.width = 400
    this.shrinkToFit = false
    this.expandToFit = false
    this.margin = 0
  }

  /**
   * @returns {HTMLCanvasElement}
   */
  getCanvas() {
    return this.canvas
  }

  /**
   * @param {number} width 
   * @param {number} height 
   */
  setSize(width, height) {
    this.width = width
    this.height = height
  }

  /**
   * @param {number} margin 
   */
  setMargin(margin) {
    this.margin = margin
  }

  /**
   * @returns {number}
   */
  getWidth() {
    return this.width
  }

  /**
   * @returns {number}
   */
  getHeight() {
    return this.height
  }

  create() {
    this.canvas.width = this.width
    this.canvas.height = this.height

    const imageRendering = BrowserEngine.isWebKit() ? 'pixelated' : 'optimizespeed'
    this.canvas.style.imageRendering = imageRendering
    this.canvas['imageSmoothingEnabled'] = false
    this.canvas['mozImageSmoothingEnabled'] = false
    this.canvas['webkitImageSmoothingEnabled'] = false

    this.addEventListeners()
    this.fitToScreen()
  }

  destroy() {
    this.removeEventListeners()
  }

  /**
   * @param {boolean} shrinkToFit 
   */
  setShrinkToFit(shrinkToFit) {
    this.shrinkToFit = shrinkToFit
  }

  /**
   * @param {boolean} expandToFit 
   */
  setExpandToFit(expandToFit) {
    this.expandToFit = expandToFit
  }

  addEventListeners() {
    if (this.shrinkToFit || this.expandToFit) {
      window.addEventListener('resize', this.fitToScreen)
    }
  }

  removeEventListeners() {
    window.removeEventListener('resize', this.fitToScreen)
  }

  fitToScreen = () => {
    const screenWidth = window.innerWidth - this.margin * 2
    const screenHeight = window.innerHeight - this.margin * 2
    const displayWidth = this.getWidth()
    const displayHeight = this.getHeight()
    let canvasWidth = displayWidth
    let canvasHeight = displayHeight
    const screenRatio = screenWidth / screenHeight
    const canvasRatio = canvasWidth / canvasHeight

    if (screenRatio > canvasRatio) {
      if ((screenHeight < displayHeight) && this.shrinkToFit) {
        canvasHeight = screenHeight
        canvasWidth = canvasHeight * canvasRatio
      } else if ((screenHeight > displayHeight) && this.expandToFit) {
        canvasHeight = screenHeight
        canvasWidth = canvasHeight * canvasRatio
      }
    } else {
      if ((screenWidth < displayWidth) && this.shrinkToFit) {
        canvasWidth = screenWidth
        canvasHeight = canvasWidth / canvasRatio
      } else if ((screenWidth > displayWidth) && this.expandToFit) {
        canvasWidth = screenWidth
        canvasHeight = canvasWidth / canvasRatio
      }
    }

    this.canvas.style.width = `${canvasWidth}px`
    this.canvas.style.height = `${canvasHeight}px`
  }
}
