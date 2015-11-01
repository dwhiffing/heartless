// Entity is an abstract class that enemy and player inherit from
// its purpose is to reduce duplication between enemy/player
export default class Entity extends Phaser.Sprite {
  constructor(x, y, key) {
    super(game, x, y, key)

    // entity anchor is defined as the center of its 'feet'
    // ( halfway across its x, and at the bottom of its y ) // this makes jumping easier
    this.anchor.setTo(0.5, 1)
    game.physics.enable(this)
    this.body.allowGravity = false

    this.runSpeed = 100
    this.jumping = false
    this.body.height = 70
  }

  update() {}

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
    this.body.velocity.y = -300
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
    super.damage(damage)
    this.animations.play("hurt")
  }

  kill() {
    super.kill()

    if (this.shadow) {
      this.shadow.kill()
    }
  }

  reset(x, y) {
    super.reset(x, y)
    if (this.shadow) [
      this.shadow.reset(x, y)
    ]
    this.animations.play("walk")
  }
}
