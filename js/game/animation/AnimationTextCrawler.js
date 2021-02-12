import Renderer from '../../engine/Renderer.js'
import Animation from './Animation.js'

export default class AnimationTextCrawler extends Animation {
  constructor() {
    super()
    this.lines = []
    this.delay = 2
    this.speed = 15
  }

  reset() {
    this.elapsed = 0
    this.current = 0
    this.offset = 0
    this.crawling = false
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  tick(renderer, delta, x, y) {
    let text = this.lines[this.current]

    if (!this.crawling && this.playing) {
      if (this.elapsed >= this.delay) {
        this.elapsed = 0
        this.crawling = true
        this.offset = 0
      }
    } else {
      let count = this.lines.length
      let nextLineIndex = (this.current + 1) % count
      let nextLine = this.lines[nextLineIndex]

      if (this.offset == text.length) {
        this.crawling = false
        this.current = nextLineIndex
        this.elapsed = 0
        
      } else {
        if (this.elapsed >= 1 / this.speed) {
          this.elapsed = 0
          this.offset++
        }
      }

      text = text.slice(this.offset) + nextLine.slice(0, this.offset)
    }

    renderer.getContext().fillText(text, x, y)
    this.elapsed += delta
  }
}
