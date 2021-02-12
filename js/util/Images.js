import IllegalInstantiationError from '../error/IllegalInstantiationError.js'
import Colors from './Colors.js'

export default class Images {
  constructor() {
    throw new IllegalInstantiationError(Images)
  }

  /**
   * @param {HTMLImageElement} image 
   * @param {number} color 
   * @param {number} replacementColor 
   * 
   * @returns {HTMLImageElement}
   */
  static replaceColor(image, color, replacementColor) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    context.drawImage(image, 0, 0)
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < imageData.data.length; i += 4) {
      const colorAtIndex = Colors.fromRGB(
        imageData.data[i],
        imageData.data[i + 1],
        imageData.data[i + 2],
        imageData.data[i + 3]
      )
      
      if (colorAtIndex == color) {
        const [r, g, b, a] = Colors.toRGB(replacementColor)
        imageData.data[i] = r
        imageData.data[i + 1] = g
        imageData.data[i + 2] = b
        imageData.data[i + 3] = a
      }
    }

    context.putImageData(imageData, 0, 0)

    const newImage = document.createElement('img')
    newImage.src = canvas.toDataURL()
    return newImage
  }
}
