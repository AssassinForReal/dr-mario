import BootPhase from '../boot/BootPhase.js'
import Display from '../engine/Display.js'
import Keyboard from '../engine/Keyboard.js'
import Renderer from '../engine/Renderer.js'
import Assets from '../util/Assets.js'
import Game from '../game/Game.js'

export const siema = 1

export default class Application {
  async create() {
    const canvas = document.getElementById('canvas')

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Element #canvas is not an instance of HTMLCanvasElement')
    }

    this.display = new Display(canvas)
    this.display.setSize(40 * 8, 24 * 8)
    this.display.setShrinkToFit(true)
    this.display.setExpandToFit(true)
    this.display.setMargin(20)
    this.display.create()

    this.renderer = new Renderer(canvas)
    this.renderer.create()
    this.renderer.clear()

    this.keyboard = new Keyboard()
    this.keyboard.create()

    await Assets.load()
  }

  async boot() {
    const bootPhase = new BootPhase(this.display, this.renderer)
    await bootPhase.boot()
  }

  async start() {
    await this.create()
    await this.boot()

    this.game = new Game(this.display, this.renderer, this.keyboard)
    this.game.start()
  }

  destroy() {
    this.keyboard.destroy()
    this.renderer.destroy()
    this.display.destroy()
  }
}
