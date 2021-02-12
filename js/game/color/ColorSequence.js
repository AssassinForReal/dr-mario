export default class ColorSequence {
  constructor() {
    this.index = 0
  }

  next() {
    const color = ['blue', 'red', 'yellow'][this.index]
    this.index = (this.index + 1) % 3
    return color
  }
}
