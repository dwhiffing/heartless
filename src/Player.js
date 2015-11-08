import Entity from './Entity'
import Bow from './Bow'
import helpers from'./helpers'

export default class Player extends Entity {
  // the Player is defined as a Phaser.Sprite
  constructor(game, x, y) {
    super(game, x, y, "player", true)
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

    this.healSound = game.add.audio('heal')
    this.jumpSound = game.add.audio('jump')
    this.hurtSound = this.game.add.audio('hurt');

    [1,2,3,4,5,6,7].forEach(n => {
      this['hit'+n+'Sound'] = this.game.add.audio('hit'+n)
    })

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
      let numHearts = this.game.hearts.countLiving()
      if (numHearts == 0) {
        this.jumpSound.play()
      } else {
        this.heal(numHearts * 4)
        this.game.hearts.callAllExists("fly", true)
        this.game.updateMulti(0)
        this.bow.update()
      }
      super.jump()
    }
    if (enemy) {
      let number = this.game.multi < 8 ? this.game.multi : 7
      this['hit'+number+'Sound'].play()
      super.jump()
    }
  }

  heal(amount) {
    this.healSound.play()
    super.heal(amount)
  }

  overlapEntity(entity) { //landed on enemy
    if (entity.y < this.shadow.y + 8 && entity.y > this.shadow.y - 8 && this.body.velocity.y > 0) {
      if (this.jumping && !entity.jumping) {
        this.jump(entity)
        entity.damage(entity.jumpDamage, true)
      }
    }
    if (this.jumping == entity.jumping) {
      this.damage(entity.damage)
    }
  }

  newHeart(type) {
    this.game.hearts.get(type)
    this.nextHeart++
    this.game.updateMulti(1)
    if (this.nextHeart>this.game.hearts.maxHearts-1) {
      this.nextHeart = 0
    }
    this.bow.update()
  }

  damage(damage) {
    if (this.invulnerable) return

    super.damage(damage)
    this.game.juicy.shake(20,100)
    this.hurtSound.play()
    this.triggerInvulnerablity()
    let soulFrame = Math.ceil(this.health/(this.maxHealth/15))
    this.soul.animations.frame = soulFrame
  }

  triggerInvulnerablity() {
    this.invulnerable = true
    helpers.flickerSprite(this, 1500)
  }
}
