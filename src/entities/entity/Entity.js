import helpers from '../../lib/helpers'
// Entity is an abstract class that enemy and player inherit from
// its purpose is to reduce duplication between enemy/player
export default class Entity extends Phaser.Sprite {
  constructor(game, x, y, key, hasShadow) {
    super(game, x, y, key)
    this.name = key

    // entity anchor is defined as the center of its 'feet'
    // ( halfway across its x, and at the bottom of its y ) // this makes jumping easier
    this.anchor.setTo(0.5, 1)
    game.physics.enable(this)
    this.body.allowGravity = false
    this.jumpHeight = 450
    this.health = this.maxHealth = 100
    this.runSpeed = 100
    this.jumping = false
    this.buffer = 50
    this.body.height = 50

    if (hasShadow) {
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
    }
  }

  preUpdate() {
    super.preUpdate()
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
    if (this.shadow) {
      helpers.keepInBounds(this.shadow)
      // shadow is used to track 'z' position while jumping
      this.z = this.shadow.y
      this.x = this.shadow.x
      if (!this.jumping) {
        this.y = this.shadow.y
      }
    }
  }

  tryJump() {
    if (!this.jumping){
      this.jump()
    }
  }

  move(dir, invert) {
    if (this.shadow) {
      this.shadow.body.velocity[dir] = this.runSpeed * invert
    } else {
      this.body.velocity[dir] = this.runSpeed * invert
    }
  }

  jump() {
    this.jumping = true
    this.body.allowGravity = true
    this.body.velocity.y = -180
    this.animations.play("jump")
  }

  land() {
    this.jumping = false
    this.body.allowGravity = false
    this.body.velocity.y = 0
    this.animations.play("walk")
  }

  shoot() {
    if (!this.jumping || this.shootsInAir) {
      this.bow.shoot(this.x-this.width/1.5, this.y-18)
    }
  }

  damage(damage) {
    this.animations.play("hurt")
    super.damage(damage)
  }

  heal(amount) {
    if (amount <= 0) return
    super.heal(amount)
    this.tint = 0x00ff00
    this.game.time.events.add(500, () => this.tint = 0xFFFFFF)
  }

  kill() {
    super.kill()
    if (this.shadow) {
      this.shadow.kill()
    }
  }

  reset(x, y, health) {
    super.reset(x, y, health)
    this.animations.play("walk")
    if (this.shadow) {
      this.shadow.reset(x, y)
    }
  }
}
