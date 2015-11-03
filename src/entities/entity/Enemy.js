import Entity from './Entity'
import helpers from '../../lib/helpers'

export default class Enemy extends Entity {
	// Enemy is abstract
	constructor(x, y, key) {
		super(200, 200, key)

		this.name = "Enemy"
		this.animations.add("walk", [0, 1, 2, 1], 4, true)
		this.animations.add("hurt", [4, 3], 10, true)
		this.kill()
	}

	update() {
	  this.z = this.y
		if(this.x > game.halfWidth+50) {
	    this.kill()
	  }
		if (this.body.velocity.x < this.maxSpeed) {
			this.body.velocity.x += 0.1
		}
		Entity.prototype.update.call(this)
	}

	reset() {
	  super.reset(-30, game.rnd.integerInRange(130, 230), this.maxHealth)
	  this.runSpeed = game.rnd.integerInRange(this.minSpeed, this.maxSpeed)
	  this.body.velocity.x = this.runSpeed
		this.jumpDamage = this.health/this.numJumps
	}

	kill() {
		if (this.jumpedOn) {
			this.jumpedOn = false
			game.player.newHeart(this.heartType)
		}
		game.blasts.get(this.x, this.y-20, 0.2, helpers.typeToHex(this.heartType))
		super.kill()
	}

	damage(damage, jumpedOn, slow=3) {
		if (this.damaged) return
		this.jumpedOn = jumpedOn
		this.damaged = true
		super.damage(jumpedOn ? this.jumpDamage : damage)

		game.time.events.add(500, function() {
			this.damaged = false
			this.alpha = 1
	    this.animations.play("walk")
	  }, this)

		this.alpha = 0.5
		this.body.velocity.x /= slow
	}

	jump() {
	  super.jump()
	}
}
