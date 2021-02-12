import IllegalInstantiationError from '../error/IllegalInstantiationError.js'
import Numbers from './Numbers.js'

export default class Settings {
  constructor() {
    throw new IllegalInstantiationError(Settings)
  }

  static MUSIC_OFF = 0
  static MUSIC_FEVER = 1
  static MUSIC_CHILL = 2

  static storageKey = 'mario-game-settings'

  static virusLevel = 10
  static speed = 0
  static music = Settings.MUSIC_FEVER

  static load() {
    const rawSettings = localStorage.getItem(Settings.storageKey)

    if (!rawSettings) return

    const settings = JSON.parse(rawSettings)

    if (!settings) return

    Settings.virusLevel = settings.virusLevel
    Settings.speed = settings.speed
    Settings.music = settings.music

    Settings.validate()
  }

  static save() {
    const settings = {
      virusLevel: Settings.virusLevel,
      speed: Settings.speed,
      music: Settings.music
    }

    localStorage.setItem(Settings.storageKey, JSON.stringify(settings))
  }

  static validate() {
    Settings.virusLevel = Numbers.limitNumber(Settings.virusLevel, 0, 20, true)
    Settings.speed = Numbers.limitNumber(Settings.speed, 0, 2, true)
    Settings.music = Numbers.limitNumber(Settings.music, 0, 2, true)
  }

  static getVirusLevel() {
    return Settings.virusLevel
  }

  /**
   * @param {number} virusLevel 
   */
  static setVirusLevel(virusLevel) {
    Settings.virusLevel = virusLevel
  }

  static getSpeed() {
    return Settings.speed
  }

  /**
   * @param {number} speed 
   */
  static setSpeed(speed) {
    Settings.speed = speed
  }

  static getMusic() {
    return Settings.music
  }

  /**
   * @param {number} music 
   */
  static setMusic(music) {
    Settings.music = music
  }

   /**
   * @param {number} speedIndex 
   * @returns {string}
   */
  static getSpeedByIndex(speedIndex) {
    return ['LOW', 'MED', 'HI'][speedIndex]
  }
}
