import Numbers from '../../util/Numbers.js'
import Settings from '../../util/Settings.js'
import Button from '../entity/control/Button.js'
import Range from '../entity/control/Range.js'
import EntityFrame from '../entity/EntityFrame.js'
import EntityTag from '../entity/EntityTag.js'
import Screen from './Screen.js'
import ScreenInGame from './ScreenInGame.js'
import ScreenMainMenu from './ScreenMainMenu.js'

export default class ScreenSettings extends Screen {
  create() {
    this.frame = new EntityFrame(5 * 8, 8, 30 * 8, 22 * 8)
    this.frame.setColor('#84373f')
    this.tag = new EntityTag(0,  8 * 12 - 2)

    Settings.load()

    this.range = new Range(8 * 10, 8 * 7, {
      max: 20,
      value: Settings.getVirusLevel()
    })

    this.buttons = [
      new Button('VIRUS LEVEL', 8 * 8, 8 * 2 + 2),
      new Button('SPEED', 8 * 8, 8 * 9 + 2),
      new Button('MUSIC', 8 * 8, 8 * 16 + 2),
    ]

    this.musicButtons = [
      new Button('OFF', 8 * 12 - 2, 8 * 19 + 2),
      new Button('FEVER', 8 * 18 - 2, 8 * 19 + 2),
      new Button('CHILL', 8 * 26 - 2, 8 * 19 + 2),
    ]

    this.controls = [
      ...this.buttons,
      ...this.musicButtons,
      this.range
    ]

    this.activeButton = 0
    this.activeSpeed = Settings.getSpeed()
    this.activeMusic = Settings.getMusic()

    this.game.playTrack('12-menu')

    this.keyboard.subscribe(this.handleKeyDown)
  }

  destroy() {
    this.keyboard.unsubscribe(this.handleKeyDown)
  }

  /**
   * @param {string} key 
   */
  handleKeyDown = (key) => {
    if (key === 'Escape' || key === 'Enter' || key === ' ') {
      Settings.setVirusLevel(this.range.value)
      Settings.setSpeed(this.activeSpeed)
      Settings.setMusic(this.activeMusic)
      Settings.save()
    }

    if (key === 'Escape') {
      this.game.setCurrentScreen(new ScreenMainMenu(this.game))
    }

    else if (key === 'Enter' || key === ' ') {
      this.game.setCurrentScreen(new ScreenInGame(this.game))
    }

    else if (key === 'ArrowDown') {
      if (this.activeButton < this.buttons.length - 1) this.activeButton++
    }

    else if (key === 'ArrowUp') {
      if (this.activeButton > 0) this.activeButton--
    }

    else if (key === 'ArrowLeft') {
      if (this.activeButton === 0) {
        this.range.decrement()
      }
      else if (this.activeButton === 1) {
        if (this.activeSpeed > 0) this.activeSpeed--
      }
      else if (this.activeButton === 2) {
        if (this.activeMusic > 0) this.activeMusic--
      }
    }

    else if (key === 'ArrowRight') {
      if (this.activeButton === 0) {
        this.range.increment()
      }
      else if (this.activeButton === 1) {
        if (this.activeSpeed < 2) this.activeSpeed++
      }
      else if (this.activeButton === 2) {
        if (this.activeMusic < 2) this.activeMusic++
      }
    }
  }

  /**
   * @param {number} delta 
   */
  render(delta) {
    this.renderer.fillCheckedRect(this.getWidth() / 40, 0, 0, this.getWidth(), this.getHeight(), '#84373f')
    this.renderBackground()
    this.renderControls()
    this.renderPressStart()
  }

  renderControls() {
    const context = this.renderer.getContext()

    this.buttons.forEach((button, index) => {
      if (this.activeButton === index) {
        button.setActive(true)
        return
      }
      button.setActive(false)
    })

    this.musicButtons.forEach((button, index) => {
      if (this.activeMusic === index) {
        button.setActive(true)
        return
      }
      button.setActive(false)
    })

    this.controls.forEach(control => {
      control.render(this.renderer)
    })

    context.fillStyle = '#6490c8'
    context.fillText(Numbers.formatNumber(this.range.value, 2), 8 * 31 + 2, 8 * 5)
    
    this.renderer.renderTextCentered('LOW', 8 * 14 + 4, 8 * 13)
    this.renderer.renderTextCentered('MED', 8 * 21, 8 * 13)
    this.renderer.renderTextCentered('HI', 8 * 27 + 4, 8 * 13)

    this.tag.x = 8 * 14 + (8 * 6 + 4) * this.activeSpeed
    this.tag.render(this.renderer)
  }

  renderBackground() {
    const context = this.renderer.getContext()
    context.fillStyle = '#000'
    context.fillRect(8 * 5, 8, 8 * 30, 22 * 8)
    this.frame.render(this.renderer)
  }

  renderPressStart() {
    const context = this.renderer.getContext()
    context.fillStyle = '#000'
    context.fillRect(8 * 10, 23 * 8, 8 * 20, 8)
    context.fillStyle = '#6490c8'
    this.renderer.renderTextCentered('PRESS START TO PLAY', this.getWidth() / 2 - 4, this.getHeight() - 8)
  }
}
