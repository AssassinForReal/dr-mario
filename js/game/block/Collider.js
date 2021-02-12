export default class Collider {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   */
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  /**
   * @param {Collider} other 
   * @returns {boolean}
   */
  collides(other) {
    return (
      (this.x < other.x + other.width) &&
      (this.x + this.width > other.x) &&
      (this.y < other.y + other.height) &&
      (this.y + this.height > other.y)
    )
  }

  clone() {
    return new Collider(this.x, this.y, this.width, this.height)
  }
}
