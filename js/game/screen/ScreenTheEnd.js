import Numbers from '../../util/Numbers.js'
import Game from '../Game.js'
import Screen from './Screen.js'
import ScreenMainMenu from './ScreenMainMenu.js'

export default class ScreenTheEnd extends Screen {
  /**
   * @param {Game} game 
   * @param {number} virusLevel 
   * @param {string} speed 
   */
  constructor(game, virusLevel, speed) {
    super(game)
    this.virusLevel = virusLevel
    this.speed = speed
  }

  create() {
    this.game.playTrack('19-the-ending')
    this.keyboard.subscribe(this.handleKeyDown)
  }

  destroy() {
    this.keyboard.unsubscribe(this.handleKeyDown)
  }

  /**
   * @param {string} key 
   */
  handleKeyDown = (key) => {
    if (key === 'Enter' || key === ' ') {
      this.game.setCurrentScreen(new ScreenMainMenu(this.game))
    }
  }

  /**
   * @param {number} delta 
   */
  render(delta) {
    this.renderer.clear()

    const x = 8 * 5
    const y = 8 * 5
    const width = 16 * 15
    
    const context = this.renderer.getContext()
    context.save()

    this.renderer.setFontSize(16)
    context.fillStyle = '#fff'
    context.fillText('CONGRATULATIONS!', x, y)

    context.fillText('VIRUS LEVEL', x, y + 24 * 2)
    context.textAlign = 'right'
    context.fillText(Numbers.formatNumber(this.virusLevel, 2), x + width, y + 24 * 2)

    context.textAlign = 'left'
    context.fillText('SPEED', x, y + 24 * 3)
    context.textAlign = 'right'
    context.fillText(this.speed, x + width, y + 24 * 3)

    context.restore()
  }
}
