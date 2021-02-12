import Debug from '../app/Debug.js'
import Display from '../engine/Display.js'
import Renderer from '../engine/Renderer.js'
import SelfTestPhase from './SelfTestPhase.js'

export default class BootPhase {
  /**
   * @param {Display} display 
   * @param {Renderer} renderer 
   */
  constructor(display, renderer) {
    this.display = display
    this.renderer = renderer
  }

  async boot() {
    Debug.info('Booting up...')
    await this.runSelfTest()
    await this.flashBasicInterpreter(300)
    await this.flashBlack(100)
  }

  async runSelfTest() {
    const selfTestPhase = new SelfTestPhase(this, this.display, this.renderer)
    await selfTestPhase.run()
  }

  /**
   * @param {number} time 
   */
  flashBlack(time) {
    return new Promise(resolve => {
      this.renderer.clear()
      setTimeout(resolve, time)
    })
  }

  /**
   * @param {number} time 
   */
  flashBasicInterpreter(time) {
    return new Promise(resolve => {
      this.renderer.clear('#185a69')
      const context = this.renderer.getContext()
      context.fillStyle = '#69aab9'
      context.fillRect(8 * 3, 0, 8, 8)
      setTimeout(resolve, time)
    })
  }
}
