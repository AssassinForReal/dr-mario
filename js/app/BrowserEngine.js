import IllegalInstantiationError from '../error/IllegalInstantiationError.js'
import Debug from './Debug.js'

export default class BrowserEngine {
  static ENGINE_UNKNOWN = 0
  static ENGINE_WEBKIT = 1
  static ENGINE_GECKO = 2

  static DETECTED_ENGINE = BrowserEngine.ENGINE_UNKNOWN

  constructor() {
    throw new IllegalInstantiationError(BrowserEngine)
  }

  static init() {
    const userAgent = navigator.userAgent

    if (userAgent.indexOf('WebKit') !== -1) {
      BrowserEngine.DETECTED_ENGINE = BrowserEngine.ENGINE_WEBKIT
      Debug.info('[BrowserEngine] Using WebKit')
    }
    
    else if (userAgent.indexOf('Gecko') !== -1) {
      BrowserEngine.DETECTED_ENGINE = BrowserEngine.ENGINE_GECKO
      Debug.info('[BrowserEngine] Using Gecko')
    }

    else {
      Debug.info('[BrowserEngine] Using Gecko')
    }
  }

  static isWebKit() {
    return BrowserEngine.DETECTED_ENGINE === BrowserEngine.ENGINE_WEBKIT
  }

  static isGecko() {
    return BrowserEngine.DETECTED_ENGINE === BrowserEngine.ENGINE_GECKO
  }
}
