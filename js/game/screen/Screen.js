import Game from '../Game.js'

export default class Screen {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    this.game = game
    this.display = game.display
    this.renderer = game.renderer
    this.keyboard = game.keyboard
  }

  create() { }

  destroy() { }

  /**
   * @param {number} delta 
   */
  render(delta) { }

  update() { }

  getWidth() {
    return this.display.getWidth()
  }

  getHeight() {
    return this.display.getHeight()
  }
}
