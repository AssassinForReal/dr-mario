import Debug from '../app/Debug.js'
import Display from '../engine/Display.js'
import Renderer from '../engine/Renderer.js'
import BootPhase from './BootPhase.js'

export default class SelfTestPhase {
  /**
   * @param {BootPhase} bootPhase
   * @param {Display} display 
   * @param {Renderer} renderer 
   */
  constructor(bootPhase, display, renderer) {
    this.bootPhase = bootPhase
    this.display = display
    this.renderer = renderer
  }

  async run() {
    Debug.info('Running self test...')
    await this.bootPhase.flashBlack(100)
    await this.playSelfTestAnimation()
    await this.bootPhase.flashBlack(250)
  }

  playSelfTestAnimation() {
    return new Promise(resolve => {
      let stage = 0

      const task = setInterval(() => {
        if (stage >= 5) {
          clearInterval(task)
          return resolve()
        }

        this.renderSelfTestScreen(stage)
        stage++
      }, 250)
    })
  }

  /**
   * @param {number} stage 
   */
  renderSelfTestScreen(stage) {
    const context = this.renderer.getContext()
    context.save()

    this.renderer.clear('#2e3f00')
    context.fillStyle = '#e6a497'
    this.renderer.setFontSize(14)
    this.renderer.renderTextCentered('SELF TEST', this.renderer.width / 2, 8 * 3)

    context.strokeStyle = '#d7d7d7'
    context.lineWidth = 1.1
    context.beginPath()
    context.moveTo(8 * 5, 8 * 7 + 0.5)
    context.lineTo(8 * 35, 8 * 7 + 0.5)
    context.stroke()

    context.beginPath()
    context.moveTo(8 * 5, 8 * 18 + 0.5)
    context.lineTo(8 * 35, 8 * 18 + 0.5)
    context.stroke()

    this.renderer.setFontSize(10)
    context.fillStyle = '#8691ed'

    if (stage == 4) context.fillStyle = '#e6a497'
    context.fillText('ALL TESTS', 8 * 7, 8 * 15)

    if (stage == 3) context.fillStyle = '#e6a497'
    context.fillText('KEYBOARD', 8 * 7, 8 * 13)

    if (stage == 2) context.fillStyle = '#e6a497'
    context.fillText('AUDIO-VISUAL', 8 * 7, 8 * 11)

    if (stage == 1) context.fillStyle = '#e6a497'
    context.fillText('MEMORY', 8 * 7, 8 * 9)

    context.fillStyle = '#d8e97d'
    context.fillRect(8 * 9 - 2, 8 * 20 - 1, 8 * 6 + 3, 8 + 1)
    context.fillRect(8 * 17 - 2, 8 * 20 - 1, 8 * 5 + 3, 8 + 1)
    context.fillRect(8 * 26 - 2, 8 * 20 - 1, 8 * 5 + 3, 8 + 1)
    
    this.renderer.setFontSize(8)
    context.fillStyle = '#2e3f00'
    context.fillText('SELECT', 8 * 9, 8 * 20)

    context.fillStyle = '#d8e97d'
    context.fillText(',', 8 * 15 + 4, 8 * 20)

    context.fillStyle = '#2e3f00'
    context.fillText('START', 8 * 17, 8 * 20)

    context.fillStyle = '#d8e97d'
    context.fillText('OR', 8 * 23, 8 * 20)

    context.fillStyle = '#2e3f00'
    context.fillText('RESET', 8 * 26, 8 * 20)

    context.restore()
  }
}
