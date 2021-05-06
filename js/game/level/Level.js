import Renderer from '../../engine/Renderer.js'
import Arrays from '../../util/Arrays.js'
import Numbers from '../../util/Numbers.js'
import AnimationBloke from '../animation/AnimationBloke.js'
import Block from '../block/Block.js'
import BlockPill from '../block/BlockPill.js'
import BlockVirus from '../block/BlockVirus.js'
import Collider from '../block/Collider.js'
import ColorSequence from '../color/ColorSequence.js'
import EntityPill from '../entity/EntityPill.js'
import ScreenInGame from '../screen/ScreenInGame.js'

export default class Level {
  /**
  * @param {ScreenInGame} screen
  * @param {number} x 
  * @param {number} y 
  */
  constructor(screen, x, y) {
    this.screen = screen
    this.game = screen.game
    this.x = x
    this.y = y
    this.width = 8
    this.height = 16
    this.lastUpdate = Date.now()
    this.lockMovement = false
    this.spawnedPillId = 0
    this.destroyingPhaseTimer = 0
    this.lastDestroyedCount = 0

    this.wallColliders = [
      new Collider(-1, 0, 1, this.height),
      new Collider(this.width, 0, 1, this.height),
      new Collider(-1, -1, 4, 1),
      new Collider(this.width - 4, -1, 4, 1)
    ]

    /**
     * @type {Block[]}
     */
    this.blocks = []

    /**
     * @type {EntityPill}
     */
    this.pill = null

    this.game.keyboard.subscribe(this.handleKeyDown)

    this.currentPhase = Level.PHASE_NO_PHASE
  }

  static PHASE_NO_PHASE = 0
  static PHASE_PLAYING = 1
  static PHASE_DESTROYING = 2
  static PHASE_FALLING = 3

  /**
   * @param {number} level 
   */
  generateField(level) {
    this.blocks = Arrays.times(
      this.width * this.height,
      () => null
    )

    const colorSequence = new ColorSequence()
    const virusCount = (level + 1) * 4

    for (let i = 0; i < virusCount; i++) {
      let randX = Numbers.randomInt(0, this.width - 1)
      let randY = Numbers.randomInt(this.height / 3 - 1, this.height - 1)

      if (this.getBlockAt(randX, randY)) {
        i--
        continue
      }

      const virus = new BlockVirus(randX, randY, colorSequence.next())
      this.setBlockAt(randX, randY, virus)
    }
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @param {Block} block 
   */
  setBlockAt(x, y, block) {
    if (block) {
      block.setPosition(x, y)
    }
    this.blocks[y * this.width + x] = block
  }

  /**
   * @param {EntityPill} pill
   */
  spawnPill(pill) {
    this.spawnedPillId++
    pill.setPosition(3, 0)
    pill.id = this.spawnedPillId
    this.pill = pill
    this.lockMovement = false
    this.lastUpdate = Date.now()
  }

  /**
  * @param {Renderer} renderer 
  * @param {number} delta 
  */
  render(renderer, delta) {
    this.blocks.forEach(block => {
      if (block) {
        block.render(renderer, delta, this.x, this.y)
      }
    })

    if (this.pill) {
      this.pill.render(renderer, this.x, this.y)
    }

    if (this.currentPhase == Level.PHASE_PLAYING) {
      this.updatePhasePlaying()
    } else if (this.currentPhase == Level.PHASE_DESTROYING) {
      this.updatePhaseDestroying()
    } else if (this.currentPhase == Level.PHASE_FALLING) {
      this.updatePhaseFalling()
    }
  }

  destroy() {
    this.game.keyboard.unsubscribe(this.handleKeyDown)
  }

  /**
   * @param {string} key 
   */
  handleKeyDown = (key) => {
    if (this.pill && !this.lockMovement && this.currentPhase == Level.PHASE_PLAYING) {
      const collider = this.pill.getCollider()

      if (key === 'ArrowUp' || key === 'Shift' || key === 'w') {
        if (this.pill.rotation === 1 || this.pill.rotation === 3) {
          const rightCollider = collider.clone()
          rightCollider.width++
          rightCollider.height--
          rightCollider.y++

          if (this.collidesWithStructures(rightCollider)) {
            rightCollider.x--

            if (this.collidesWithStructures(rightCollider)) {
              return
            }

            this.pill.x--
          }
        }

        else if (this.pill.rotation === 0 || this.pill.rotation === 2) {
          const topCollider = collider.clone()
          topCollider.y--
          topCollider.width--
          topCollider.height++

          if (this.collidesWithStructures(topCollider)) {
            return
          }
        }

        if (key === 'ArrowUp' || key === 'w') {
          this.pill.rotateLeft()
        }

        if (key === 'Shift') {
          this.pill.rotateRight()
        }
      }

      else if (key === 'ArrowDown' || key === 's') {
        this.pill.speed = 30
        this.lockMovement = true
      }

      else if (key === 'ArrowLeft' || key === 'a') {
        const leftCollider = collider.clone()
        leftCollider.x--

        if (!this.collidesWithStructures(leftCollider)) {
          this.pill.x--
        }
      }

      else if (key === 'ArrowRight' || key === 'd') {
        const rightCollider = collider.clone()
        rightCollider.x++

        if (!this.collidesWithStructures(rightCollider)) {
          this.pill.x++
        }
      }
    }
  }

  /**
   * @param {Collider} collider 
   * @returns {boolean}
   */
  collidesWithWalls(collider) {
    return this.wallColliders.findIndex(wallCollider => (
      collider.collides(wallCollider)
    )) != -1
  }

  /**
   * @param {Collider} collider 
   * @returns {boolean}
   */
  collidesWithBlocks(collider) {
    return this.blocks.findIndex(block => {
      if (!block) return false
      return block.getCollider().collides(collider)
    }) != -1
  }

  /**
   * @param {Collider} collider 
   * @returns {boolean}
   */
  collidesWithStructures(collider) {
    return this.collidesWithWalls(collider) || this.collidesWithBlocks(collider)
  }

  updatePhasePlaying() {
    if (this.pill) {
      const time = Date.now()

      if (time - this.lastUpdate >= 1000 / this.pill.speed) {
        this.lastUpdate = time
        const bottomCollider = this.pill.getCollider()
        bottomCollider.y++

        if ((this.pill.y < this.height - 1) && !this.collidesWithBlocks(bottomCollider)) {
          this.pill.y++
        } else {
          const [block1, block2] = this.pillEntityToBlocks(this.pill)
          this.setBlockAt(block1.x, block1.y, block1)
          this.setBlockAt(block2.x, block2.y, block2)
          this.pill = null
          this.currentPhase = Level.PHASE_DESTROYING
          this.destroyingPhaseTimer = 0
        }
      }
    }
  }

  updatePhaseDestroying() {
    if (this.destroyingPhaseTimer == 0) {
      this.markToRemove(
        () => 0,
        a => a < this.height,
        a => a + 1,
        () => 0,
        b => b < this.width,
        b => b + 1,
        (a, b) => this.getBlockAt(b, a)
      )

      this.markToRemove(
        () => 0,
        a => a < this.width,
        a => a + 1,
        () => 0,
        b => b < this.height,
        b => b + 1,
        (a, b) => this.getBlockAt(a, b)
      )

      let destroyedCount = 0

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let block = this.getBlockAt(x, y)
          if (!block) continue

          if (block.markedToRemove) {
            if (block instanceof BlockPill) {
              let pairedBlock = this.getPairedBlock(block)

              if (pairedBlock && !pairedBlock.markedToRemove) {
                pairedBlock.makeBall()
              }
            }

            if (block instanceof BlockPill) {
              block.makeEmpty()
            }

            else if (block instanceof BlockVirus) {
              block.makeX()
              this.onVirusBreak(block.color)
            }

            destroyedCount++
          }
        }
      }

      this.lastDestroyedCount = destroyedCount

      if (destroyedCount == 0) {
        this.currentPhase = Level.PHASE_FALLING
        this.fallingPhaseTimer = 0
        this.lastFallenCount = 0
      }
    }
    else if (this.destroyingPhaseTimer == 5) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let block = this.getBlockAt(x, y)
          if (!block) continue

          if (block.markedToRemove) {
            this.setBlockAt(x, y, null)
          }
        }
      }
    }
    else if (this.destroyingPhaseTimer == 6) {
      this.currentPhase = Level.PHASE_FALLING
      this.fallingPhaseTimer = 0
      this.lastFallenCount = 0
    }

    this.destroyingPhaseTimer++
  }

  updatePhaseFalling() {
    if (this.fallingPhaseTimer == 5) {
      const checkedIds = []

      let fallCounter = 0

      for (let y = this.height - 2; y >= 0; y--) {
        for (let x = 0; x < this.width; x++) {
          let block = this.getBlockAt(x, y)
          if (!block || !(block instanceof BlockPill)) continue
          if (checkedIds.includes(block.id)) continue

          checkedIds.push(block.id)

          let blockBelow = this.getBlockAt(x, y + 1)
          if (!blockBelow) {
            let pairedBlock = this.getPairedBlock(block)

            if (!pairedBlock) {
              this.moveBlock(block, x, y + 1)
              fallCounter++
            } else {
              checkedIds.push(pairedBlock.id)

              let blockBelowPaired = this.getBlockAt(pairedBlock.x, pairedBlock.y + 1)

              if (!blockBelowPaired || blockBelowPaired == block) {
                this.moveBlock(block, x, y + 1)
                this.moveBlock(pairedBlock, pairedBlock.x, pairedBlock.y + 1)
                fallCounter++
              }
            }
          }
        }
      }

      if (fallCounter == 0) {
        if (this.lastDestroyedCount == 0) {
          this.currentPhase = Level.PHASE_NO_PHASE

          if (this.collidesWithStructures(new Collider(3, 0, 2, 1))) {
            this.pill = null
            this.game.playTrack('13-game-over')
            this.screen.hasGameEnded = true
            this.screen.mario.makeTPose()
            this.screen.animationBlue.doLaugh()
            this.screen.animationBlue.setAround(false)
            this.screen.animationRed.doLaugh()
            this.screen.animationRed.setAround(false)
            this.screen.animationYellow.doLaugh()
            this.screen.animationYellow.setAround(false)
            this.screen.animationFlyingPill.pill.setVisible(false)
            return
          } else {
            this.screen.animationFlyingPill.play()
          }
        } else {
          if (this.getVirusCount() == 0) {
            this.currentPhase = Level.PHASE_NO_PHASE
            this.screen.onStageCompleted()
          } else {
            this.currentPhase = Level.PHASE_DESTROYING
            this.destroyingPhaseTimer = 0
          }
        }
      }

      this.fallingPhaseTimer = 0
    }

    this.fallingPhaseTimer++
  }

  /**
   * @param {EntityPill} pill 
   * @returns {BlockPill[]}
   */
  pillEntityToBlocks(pill) {
    const color1 = pill.colors[0]
    const color2 = pill.colors[1]

    const block1 = new BlockPill(0, 0, pill.id, color1)
    const block2 = new BlockPill(0, 0, pill.id, color2)

    if (pill.rotation == 0) {
      block1.x = pill.x
      block2.x = pill.x + 1
      block1.y = pill.y
      block2.y = pill.y
      block1.makeLeft()
      block2.makeRight()
    }

    else if (pill.rotation == 1) {
      block1.x = pill.x
      block2.x = pill.x
      block1.y = pill.y
      block2.y = pill.y - 1
      block1.makeBottom()
      block2.makeTop()
    }

    else if (pill.rotation == 2) {
      block1.x = pill.x + 1
      block2.x = pill.x
      block1.y = pill.y
      block2.y = pill.y
      block1.makeRight()
      block2.makeLeft()
    }

    else if (pill.rotation == 3) {
      block1.x = pill.x
      block2.x = pill.x
      block1.y = pill.y - 1
      block2.y = pill.y
      block1.makeTop()
      block2.makeBottom()
    }

    return [block1, block2]
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @returns {Block}
   */
  getBlockAt(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null
    return this.blocks[x + y * this.width]
  }

  /**
   * @param {BlockPill} block 
   * @returns {BlockPill}
   */
  getPairedBlock(block) {
    if (!block || !block.id) return null

    for (let y = -1; y != 2; y++) {
      for (let x = -1; x != 2; x++) {
        let blockAt = this.getBlockAt(block.x + x, block.y + y)
        if (block == blockAt) continue

        if (blockAt && (blockAt instanceof BlockPill)) {
          if (block.id == blockAt.id) {
            return blockAt
          }
        }
      }
    }

    return null
  }

  /**
   * @param {Block} block 
   * @param {number} newX 
   * @param {number} newY 
   */
  moveBlock(block, newX, newY) {
    this.setBlockAt(block.x, block.y, null)
    this.setBlockAt(newX, newY, block)
  }

  /**
   * @param {string} color 
   */
  onVirusBreak(color) {
    const virusCount = this.getVirusCount()
    this.screen.setVirus(virusCount)
    this.screen.setScore(this.screen.score + 100)

    if (color == 'blue') {
      this.doDieAndUndo(this.screen.animationBlue, color)
    }

    else if (color == 'red') {
      this.doDieAndUndo(this.screen.animationRed, color)
    }

    else if (color == 'yellow') {
      this.doDieAndUndo(this.screen.animationYellow, color)
    }
  }

  /**
   * @param {AnimationBloke} animation 
   * @param {string} color
   */
  doDieAndUndo(animation, color) {
    animation.doDie()

    setTimeout(() => {
      if (animation.type == AnimationBloke.TYPE_DIE) {
        animation.doDance()

        if (this.getVirusCount(color) == 0) {
          animation.setVisible(false)
        }
      }
    }, 2000)
  }

  /**
   * @param {string} color 
   */
  getVirusCount(color = null) {
    let virusCount = 0

    this.blocks.forEach(block => {
      if (!block || !(block instanceof BlockVirus) || block.markedToRemove) return
      if (!color || block.color == color) virusCount++
    })

    return virusCount
  }

  /**
   * @param {Function} aInit 
   * @param {Function} aCond 
   * @param {Function} aAction 
   * @param {Function} bInit 
   * @param {Function} bCond 
   * @param {Function} bAction 
   * @param {Function} getBlock 
   */
  markToRemove(aInit, aCond, aAction, bInit, bCond, bAction, getBlock) {
    for (let a = aInit(); aCond(a); a = aAction(a)) {
      let blocks = []
      let color = ''
      let atLeastOnePillBlock = false

      for (let b = bInit(); bCond(b); b = bAction(b)) {
        const block = getBlock(a, b)

        if (block) {
          if (block.color === color) {
            blocks.push(block)

            if (block instanceof BlockPill) {
              atLeastOnePillBlock = true
            }
          } else {
            if (blocks.length >= 4 && atLeastOnePillBlock) {
              blocks.forEach(b => b.markedToRemove = true)
            }

            blocks = [block]
            color = block.color

            if (block instanceof BlockPill) {
              atLeastOnePillBlock = true
            }
          }
        } else {
          if (blocks.length >= 4 && atLeastOnePillBlock) {
            blocks.forEach(b => b.markedToRemove = true)
          }

          blocks = []
          color = ''
          atLeastOnePillBlock = false
        }
      }

      if (blocks.length >= 4 && atLeastOnePillBlock) {
        blocks.forEach(b => b.markedToRemove = true)
      }
    }
  }
}
