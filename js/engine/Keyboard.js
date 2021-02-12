export default class Keyboard {
  constructor() {
    this.keyMap = {}
    this.lastKeyPresses = {}
    this.observers = []
  }

  create() {
    addEventListener('keydown', this.handleKeyDown)
    addEventListener('keyup', this.handleKeyUp)
  }

  /**
   * @param {KeyboardEvent} event 
   */
  handleKeyDown = event => {
    if (!this.keyMap[event.key]) {
      this.keyMap[event.key] = true
      this.lastKeyPresses[event.key] = 0
    }
  }

  /**
   * @param {KeyboardEvent} event 
   */
  handleKeyUp = event => {
    this.keyMap[event.key] = false
  }

  /**
   * @param {string} key 
   * @returns {boolean}
   */
  isKeyDown(key) {
    if (!(key in this.keyMap)) return false
    return this.keyMap[key]
  }

  update() {
    const time = Date.now()

    for (const key of Object.keys(this.keyMap)) {
      if (this.keyMap[key]) {
        if (!(key in this.lastKeyPresses)) {
          this.lastKeyPresses[key] = 0
        }

        if (time - this.lastKeyPresses[key] >= 1000 / 5) {
          this.lastKeyPresses[key] = time
          this.observers.forEach(observer => {
            observer(key)
          })
        }
      }
    }
  }

  /**
   * @param {Function} callback 
   */
  subscribe(callback) {
    setTimeout(() => {
      this.observers.push(callback)
    }, 50)
  }

  /**
   * @param {Function} callback 
   */
  unsubscribe(callback) {
    this.observers = this.observers.filter(observer => observer != callback)
  }

  destroy() {
    removeEventListener('keydown', this.handleKeyDown)
    removeEventListener('keyup', this.handleKeyUp)
  }
}
