import HighScore from '../../util/HighScore.js'
import Numbers from '../../util/Numbers.js'
import Settings from '../../util/Settings.js'
import AnimationBloke from '../animation/AnimatiomBloke.js'
import AnimationFlyingPill from '../animation/AnimationFlyingPill.js'
import RandomColor from '../color/RandomColor.js'
import EntityClipboard from '../entity/EntityClipboard.js'
import EntityFrame from '../entity/EntityFrame.js'
import EntityJar from '../entity/EntityJar.js'
import EntityMagnifier from '../entity/EntityMagnifier.js'
import EntityMario from '../entity/EntityMario.js'
import EntityPill from '../entity/EntityPill.js'
import Level from '../level/Level.js'
import LevelColors from '../level/LevelColors.js'
import Screen from './Screen.js'
import ScreenMainMenu from './ScreenMainMenu.js'
import ScreenTheEnd from './ScreenTheEnd.js'

export default class ScreenInGame extends Screen {
  create() {
    this.magnifier = new EntityMagnifier(8, 12 * 8)

    this.marioFrame = new EntityFrame(8 * 29, 8 * 2, 8 * 9, 8 * 9)
    this.marioFrame.setImage('button.png')
    this.marioFrame.setTexCoords(0, 3)

    this.jar = new EntityJar(8 * 15, 8 * 2)

    this.mario = new EntityMario(8 * 30, 8 * 4)

    const danceRadius = 8 * 3 - 1

    this.animationBlue = new AnimationBloke('bloke-blue.png')
    this.animationBlue.radius = danceRadius
    this.animationBlue.cycleSpeed = 24
    this.animationBlue.startAngle = 0
    this.animationBlue.setAround(true)
    this.animationBlue.doDance()
    this.animationBlue.play()

    this.animationRed = new AnimationBloke('bloke-red.png')
    this.animationRed.radius = danceRadius
    this.animationRed.cycleSpeed = 24
    this.animationRed.startAngle = 120
    this.animationRed.setAround(true)
    this.animationRed.doDance()
    this.animationRed.play()

    this.animationYellow = new AnimationBloke('bloke-yellow.png')
    this.animationYellow.radius = danceRadius
    this.animationYellow.cycleSpeed = 24
    this.animationYellow.startAngle = 240
    this.animationYellow.setAround(true)
    this.animationYellow.doDance()
    this.animationYellow.play()

    this.clipboardScore = new EntityClipboard(8, 8 * 2, 8 * 13, 8 * 9, 8 * 7)
    this.clipboardScore.setLine(1, 'TOP')
    this.clipboardScore.setLine(4, 'SCORE')
    this.setTopScore(HighScore.getHighScore())
    this.setScore(0)

    const speed = Settings.getSpeedByIndex(Settings.getSpeed())

    this.clipboardLevel = new EntityClipboard(8 * 28, 8 * 12, 8 * 11, 8 * 12, 8 * 5)
    this.clipboardLevel.setLine(1, 'LEVEL')
    this.clipboardLevel.setLine(4, 'SPEED')
    this.clipboardLevel.setLine(7, 'VIRUS')

    this.setSpeed(speed)
    this.playMusic()

    this.lastUpdate = Date.now()

    this.gameFieldWidth = 8
    this.gameFieldHeight = 16

    this.level = new Level(this, 8 * 17, 8 * 6)
    this.level.generateField(Settings.getVirusLevel())

    this.keyboard.subscribe(this.handleKeyDown)

    this.hasGameEnded = false
    this.animationFlyingPill = new AnimationFlyingPill(null)
    
    this.nextPill = new EntityPill(0, 0, 0)
    this.nextPill.setColors(RandomColor.get(), RandomColor.get())

    this.animationFlyingPill.pill = this.nextPill
    this.animationFlyingPill.play()

    this.displayStageCompleted = false
    this.stageCompletedFrame = new EntityFrame(8 * 12, 8 * 8, 8 * 18, 5 * 8)
    this.gameOverFrame = new EntityFrame(8 * 14, 8 * 8, 8 * 14, 5 * 8)

    this.setLevel(Settings.getVirusLevel())
    this.score = 0
  }

  destroy() {
    this.keyboard.unsubscribe(this.handleKeyDown)
    this.level.destroy()
  }

  /**
   * @param {string} key 
   */
  handleKeyDown = (key) => {
    if (key === 'Escape' || ((key === ' ' || key === 'Enter') && this.hasGameEnded)) {
      this.game.setCurrentScreen(new ScreenMainMenu(this.game))
    }

    else if ((key === ' ' || key === 'Enter') && this.displayStageCompleted) {
      this.setLevel(this.currentLevel + 1)
      this.level.generateField(this.currentLevel)
      this.displayStageCompleted = false
      this.nextPill = new EntityPill(10, 3, 0)
      this.nextPill.setColors(RandomColor.get(), RandomColor.get())
      this.animationFlyingPill.pill = this.nextPill
      this.animationFlyingPill.play()
      this.mario.handUp()
      
      this.animationBlue.setVisible(true)
      this.animationBlue.setAround(true)
      this.animationBlue.doDance()

      this.animationRed.setVisible(true)
      this.animationRed.setAround(true)
      this.animationRed.doDance()

      this.animationYellow.setVisible(true)
      this.animationYellow.setAround(true)
      this.animationYellow.doDance()

      this.playMusic()
    }
  }

  /**
   * @param {number} delta 
   */
  render(delta) {
    this.renderer.fillCheckedRect(this.getWidth() / 40, 0, 0, this.getWidth(), this.getHeight(), LevelColors.getLevelColor(this.currentLevel))

    this.clipboardScore.render(this.renderer)
    this.clipboardLevel.render(this.renderer)

    this.magnifier.render(this.renderer)

    this.marioFrame.render(this.renderer)
    this.mario.render(this.renderer)

    this.jar.render(this.renderer)

    this.animationBlue.render(this.renderer, delta, 8 * 5 + 4, 8 * 16 + 4)
    this.animationRed.render(this.renderer, delta, 8 * 5 + 4, 8 * 16 + 4)
    this.animationYellow.render(this.renderer, delta, 8 * 5 + 4, 8 * 16 + 4)

    this.level.render(this.renderer, delta)

    this.animationFlyingPill.render(this.renderer, delta, 20 * 8, 0)

    if (this.animationFlyingPill.counter == 1) {
      this.mario.handMiddle()
    }

    if (this.animationFlyingPill.counter == 2) {
      this.mario.handDown()
    }

    if (this.animationFlyingPill.counter > 24) {
      this.animationFlyingPill.stop()
      this.animationFlyingPill.counter = 0
      this.level.spawnPill(this.nextPill)
      this.level.currentPhase = Level.PHASE_PLAYING

      this.nextPill = new EntityPill(10, 3, 0)
      this.nextPill.setColors(RandomColor.get(), RandomColor.get())
      this.animationFlyingPill.pill = this.nextPill
      this.mario.handUp()
    }

    if (this.displayStageCompleted) {
      this.stageCompletedFrame.render(this.renderer)
      this.renderer.getContext().fillStyle = '#6490c8'
      this.renderer.getContext().fillText('STAGE COMPLETED', this.stageCompletedFrame.x + 12, this.stageCompletedFrame.y + 8 * 2)
    }

    if (this.hasGameEnded) {
      this.gameOverFrame.render(this.renderer)
      this.renderer.getContext().fillStyle = '#6490c8'
      this.renderer.getContext().fillText('GAME OVER', this.gameOverFrame.x + 20, this.gameOverFrame.y + 8 * 2)
    }
  }

  /**
   * @param {number} topScore 
   */
  setTopScore(topScore) {
    this.clipboardScore.setLine(2, '   ' + Numbers.formatNumber(topScore, 7))
  }

  /**
   * @param {number} score 
   */
  setScore(score) {
    this.score = score
    this.clipboardScore.setLine(5, '   ' + Numbers.formatNumber(score, 7))

    if (score > HighScore.getHighScore()) {
      HighScore.setHighScore(score)
    }
  }

  /**
   * @param {number} level 
   */
  setLevel(level) {
    this.currentLevel = level
    this.clipboardLevel.setLine(2, '      ' + Numbers.formatNumber(level, 2))
    this.setVirus((level + 1) * 4)
    
    const levelColor = LevelColors.getLevelColor(level)
    this.jar.setColor(levelColor)
    this.stageCompletedFrame.setColor(levelColor)
    this.gameOverFrame.setColor(levelColor)
  }

  /**
   * @param {string} speed 
   */
  setSpeed(speed) {
    this.clipboardLevel.setLine(5, '      ' + speed)
  }

  /**
   * @param {number} virus 
   */
  setVirus(virus) {
    this.clipboardLevel.setLine(8, '      ' + Numbers.formatNumber(virus, 2))
  }

  onStageCompleted() {
    if (this.currentLevel == 20) {
      this.game.setCurrentScreen(new ScreenTheEnd(
        this.game,
        this.currentLevel,
        Settings.getSpeedByIndex(Settings.getSpeed())
      ))
      return
    }
    this.displayStageCompleted = true
    this.game.playTrack('15-the-winner')
  }

  playMusic() {
    const music = Settings.getMusic()

    const tracks = [
      '12-menu',
      '00-fever',
      '02-chill'
    ]

    this.game.playTrack(tracks[music])
  }
}
