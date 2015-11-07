import Entity from './Entity'
import helpers from '../../lib/helpers'

export default class Enemy extends Entity {
	// Enemy is abstract
	constructor(game, x, y, key) {
		super(game, -200, -200, key)
		this.score = 100
		this.name = "Enemy"
		this.animations.add("walk", [0, 1, 2, 1], 4, true)
		this.animations.add("hurt", [4, 3], 10, true)
		this.kill()
	}

	update() {
	  this.z = this.y
		if(this.x > this.game.width/2+50) {
	    this.kill()
	  }
		if (this.body.velocity.x < this.maxSpeed) {
			this.body.velocity.x += 0.01
		}
		Entity.prototype.update.call(this)
	}

	reset() {
	  super.reset(-30, this.game.rnd.integerInRange(130, 230), this.maxHealth)
	  this.runSpeed = this.game.rnd.integerInRange(this.minSpeed, this.maxSpeed)
	  this.body.velocity.x = this.runSpeed
		this.jumpDamage = this.health/this.numJumps
	}

	kill() {
		if (this.damaged) {
			if (this.jumpedOn) {
				this.jumpedOn = false
				this.game.player.newHeart(this.heartType)
			}
			this.game.blasts.get(this.x, this.y-20, 0.2, helpers.typeToHex(this.heartType))
			this.game.updateScore(this.score, this.x, this.y-100)
		}
		super.kill()
	}

	damage(damage, jumpedOn, slow, push) {
		if (this.damaged) return
		this.jumpedOn = jumpedOn
		this.damaged = true
		super.damage(jumpedOn ? this.jumpDamage : damage)
		this.game.time.events.add(500, function() {
			this.damaged = false
			this.alpha = 1
	    this.animations.play("walk")
	  }, this)

		this.alpha = 0.5
		this.body.velocity.x /= slow
		if (!this.jumpedOn) {
			this.game.add.tween(this).to( {x: this.x-push}, 500, Phaser.Easing.Quadratic.Out, true).start()
		}
	}

	jump() {
	  super.jump()
	}
}
