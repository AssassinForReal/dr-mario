import Assets from '../../util/Assets.js'
import AnimationBloke from '../animation/AnimatiomBloke.js'
import AnimationTextCrawler from '../animation/AnimationTextCrawler.js'
import EntityTag from '../entity/EntityTag.js'
import Screen from './Screen.js'
import ScreenSettings from './ScreenSettings.js'

export default class ScreenMainMenu extends Screen {
  create() {
    this.imageSign = Assets.getImage('dr-mario-sign.png')
    this.tag = new EntityTag(0, 0)

    this.animationDance = new AnimationBloke()
    this.animationDance.doDance()
    this.animationDance.play()

    this.animationTextCrawler = new AnimationTextCrawler()
    this.animationTextCrawler.play()

    this.animationTextCrawler.lines = [
      'ORIGINAL VERSION',
      ' NINTENDO 1990  ',
      ' ATARI VERSION  ',
      ' 2010 CODE PAW  ',
      '  MUSIC MIKER   '
    ]

    this.currentOption = 0
    this.game.playTrack('11-title')

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
      this.game.setCurrentScreen(new ScreenSettings(this.game))
    }
  }

  /**
   * @param {number} delta 
   */
  render(delta) {
    this.renderer.fillCheckedRect(this.getWidth() / 40, 0, 0, this.getWidth(), this.getHeight(), '#27710b')
    this.renderSign()
    this.renderOptions(delta)
  }

  renderSign() {
    const width = 8 * 28
    const height = 8 * 10
    const x = this.getWidth() / 2 - width / 2
    const y = 8 * 2
    this.renderer.getContext().drawImage(this.imageSign, x, y, width, height)
  }

  /**
   * @param {number} delta 
   */
  renderOptions(delta) {
    const context = this.renderer.getContext()
    const x = 8 * 6
    const y = 8 * 14
    const width = 28 * 8
    const height = 7 * 8

    context.fillStyle = '#000'
    context.beginPath()
    this.renderer.renderRoundedRect(x, y, width, height, height / 2)
    context.fill()
    context.fillStyle = '#6490c8'
    context.fillText('1 PLAYER GAME', x + 8 * 6, y + 8 * 1)
    context.fillStyle = '#444'
    context.fillText('2 PLAYER GAME', x + 8 * 6, y + 8 * 3)
    context.fillStyle = '#6490c8'
    context.fillText('V7', x + 8 * 22, y + 8 * 5)
    
    this.tag.setPosition(x + 8 * 5, y + 8 + (this.currentOption * 8 * 2))
    this.tag.render(this.renderer)

    this.animationDance.render(this.renderer, delta, x + 8 * 21, y + 8)
    this.animationTextCrawler.render(this.renderer, delta, x + 8 * 5, y + 8 * 5)
  }
}
