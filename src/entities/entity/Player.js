import Entity from './Entity'
import Bow from '../Bow'
import helpers from '../../lib/helpers'

export default class Player extends Entity {
  // the Player is defined as a Phaser.Sprite
  constructor(x, y) {
    super(x, y, "player", true)
    this.body.height = 30

    // extra offset is required here to center soul onto entity
    // soul is added as a child of player because
    // we always want it to match the player position
    this.soul = game.add.sprite(2, -16, "soul")
    this.soul.animations.add('life', [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
    ])
    this.soul.animations.play('life', 0)
    this.addChild(this.soul)

    // create animations based on frames in spritesheet
    // play at 2 frames per second and loop
    this.animations.add('walk', [0, 1], 2, true)
    this.animations.add('jump', [2], 2, true)
    this.animations.add('hurt', [3], 2, true)
    this.animations.add('heal', [4], 2, true)
    this.animations.add('still', [0], 2, true)
    this.animations.play('walk')

    // create a Bow to track player weapon stats
    this.bow = new Bow(this)
    this.multi = 1
    this.bestMulti = 1
    this.nextHeart = 0
  }

  update() {
    super.update()
  }

  jump(enemy) {
    if (!this.jumping) {
      game.hearts.callAllExists("fly", true)
      this.bow.update()
      let numHearts = game.hearts.filter(c=>c.alive).length
      this.heal(numHearts * 4)
      this.bow.update()
    }
    if (enemy || !this.jumping) {
      super.jump()
    }
  }

  overlapEntity(entity) { //landed on enemy
    if (entity.y < this.shadow.y + 15 && entity.y > this.shadow.y - 15 && this.body.velocity.y > 0) {
      if (this.jumping && !entity.jumping) {
        this.jump(entity)
        entity.damage(entity.jumpDamage, true)
      }
    }
    if ((!this.jumping && !entity.jumping) || (this.jumping && entity.jumping)) {
      this.damage(entity.damage)
    }
  }

  newHeart(type) {
    game.heartManager.getHeart(type)
    this.nextHeart++
    if (this.nextHeart>game.heartManager.maxHearts-1) {
      this.nextHeart = 0
    }
    this.bow.update()
  }

  damage(damage) {
    if (this.invulnerable) return

    super.damage(damage)
    game.juicy.shake(20,100)
    this.triggerInvulnerablity()
    let soulFrame = Math.ceil(this.health/(this.maxHealth/15))
    this.soul.animations.frame = soulFrame
  }

  triggerInvulnerablity() {
    this.invulnerable = true
    helpers.flickerSprite(this, 1500)
  }
}
