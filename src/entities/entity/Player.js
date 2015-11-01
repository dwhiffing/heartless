import Entity from './Entity'
import Bow from '../Bow'
import helpers from '../../lib/helpers'

export default class Player extends Entity {
  // the Player is defined as a Phaser.Sprite
  constructor(x, y) {
    super(x, y, "player")

    this.name = "Player"
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

     // shadow anchor is defined as its absolute center
    // shadow not added, we need to control it separately
    this.shadow = game.add.sprite(x, y, "shadow")
    this.shadow.anchor.setTo(0.5, 0.5)
    game.physics.enable(this.shadow)
    this.shadow.body.allowGravity = false
    this.shadow.body.maxVelocity.set(
      this.runSpeed, this.runSpeed/2.2
    )
    this.shadow.body.drag.set(550)
    game.backGroup.add(this.shadow)

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

    this.jumpHeight = 500
    this.invulnerableTime = 1500
    this.health = this.maxHealth = 100
    this.buffer = 50
    this.multi = 1
    this.bestMulti = 1
  }

  preUpdate() {
    super.preUpdate(this)
    if (this.jumping){
      // keep from jumping too far past shadow
      if(this.y < this.shadow.y-100) {
        this.y = this.shadow.y-100
      }
      // land if fallen past shadow and moving downwards
      if(this.y > this.shadow.y && this.body.velocity.y > 0) {
        this.land()
      }
    }
  }

  update() {
    super.update()
    helpers.keepInBounds(this.shadow)

    // shadow is used to track 'z' position while jumping
    this.z = this.shadow.y
    this.x = this.shadow.x
    if (!this.jumping) {
      this.y = this.shadow.y
    }
  }

  tryJump() {
    if (!this.jumping){
      this.jump()
      let numHearts = game.heartGroup.filter(c=>c.alive).length
      this.heal(numHearts * 4)
    }
  }

  heal(healAmount) {
    if (healAmount <= 0) return
    this.resetCombo()
    this.health += Math.ceil(healAmount)
    if (this.health > 100) {
      this.health = 100
    }
    this.tint = 0x00ff00
    game.time.events.add(500, function(){
      this.tint = 0xffffff
    }, this)
  }

  resetCombo() {
    this.bow.resetStats()
    game.heartGroup.callAllExists("fly", true)
  }

  hit(_enemy) { //landed on enemy
    if (_enemy.y < this.shadow.y + 15 && _enemy.y > this.shadow.y - 15 && this.body.velocity.y > 0) {
      if (this.jumping && !_enemy.jumping) {
        this.jump(_enemy)
        _enemy.damage(_enemy.jumpDamage, true)
        game.heartManager.getHeart(_enemy.heartType)
        this.bow.update()
      }
    }
    if ((!this.jumping && !_enemy.jumping) || (this.jumping && _enemy.jumping)) {
      this.damage(_enemy.damage)
    }
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
    helpers.flickerSprite(this)
  }
}
