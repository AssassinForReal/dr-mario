import IllegalInstantiationError from '../error/IllegalInstantiationError.js'

export default class Assets {
  constructor() {
    throw new IllegalInstantiationError(Assets)
  }

  static imageNames = [
    'dr-mario-sign.png',
    'tag.png',
    'bloke.png',
    'bloke-blue.png',
    'bloke-red.png',
    'bloke-yellow.png',
    'frame.png',
    'button.png',
    'clipboard.png',
    'magnifier.png',
    'jar.png',
    'mario.png',
    'virus-blue.png',
    'virus-red.png',
    'virus-yellow.png',
    'pill-blue.png',
    'pill-red.png',
    'pill-yellow.png',
  ]

  static trackNames = [
    '00-fever',
    '02-chill',
    '11-title',
    '12-menu',
    '13-game-over',
    '15-the-winner',
    '19-the-ending'
  ]

  static images = {}

  static async load() {
    await Assets.loadImages()
    Assets.preloadTracks()
  }

  static async loadImages() {
    Assets.images = Object.fromEntries(
      await Promise.all(
        Assets.imageNames.map(imageName => (
          new Promise((resolve, reject) => {
            const image = new Image()
            image.src = `assets/images/${imageName}`
            image.addEventListener('load', () => resolve([
              imageName, image
            ]))
            image.addEventListener('error', err => reject(err))
          })
        ))
      )
    )
  }

  static preloadTracks() {
    Assets.trackNames.forEach(trackName => {
      try {
        const audio = new Audio()
        audio.src = `assets/sounds/tracks/${trackName}.mp3`
        audio.play()
        audio.volume = 0.0000001
      } catch (err) { }
    })
  }

  /**
   * @param {string} imageName
   * @returns {HTMLImageElement}
   */
  static getImage(imageName) {
    if (imageName in Assets.images) {
      return Assets.images[imageName]
    }
    return null
  }
}
