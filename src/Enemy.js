import Entity from './Entity'
import helpers from'./helpers'
import constants from './Constants'

export default class Enemy extends Entity {
	// Enemy is abstract
	constructor(game) {
		super(game, 200, 200, 'enemy')
		this.score = 100
		this.name = "Enemy"
		this.stats = constants.enemy
		this.animations.add("skeleton", [0, 1, 2, 1], 4, true)
		this.animations.add("soldier", [3, 4, 5, 4], 4, true)
		this.animations.add("helmet", [6, 7, 8, 7], 4, true)
		this.animations.add("fly", [9, 10, 11, 10], 4, true)
		this.kill()
	}

	update() {
	  this.z = this.y+this.x
		if(this.x > this.game.width/2+50) {
	    this.kill()
	  }
		if (this.body.velocity.x < this.maxSpeed) {
			this.body.velocity.x += 0.05
		}
		Entity.prototype.update.call(this)
	}

	reset(x, y, type, color) {
		let colorName = helpers.typeToHex(color)
		this.tint = colorName
		this.heartType = color
		this.tint = colorName
		if (typeof type == "number") {
			type = helpers.typeToEnemy(type)
		}

		this.maxHealth = this.stats[type].maxHealth
		this.numJumps = this.stats[type].numJumps
		this.minSpeed = this.stats[type].minSpeed
		this.maxSpeed = this.stats[type].maxSpeed

		this.runSpeed = this.game.rnd.integerInRange(this.minSpeed, this.maxSpeed)

		let frameRate = parseInt(this.runSpeed/25, 10)
		frameRate = Math.max(2, frameRate)
		this.animations.play(type,frameRate)

		let y = 15 * this.game.rnd.integerInRange(8, 15)
	  super.reset(-30, y, this.maxHealth)
		this.jumpDamage = this.health/this.numJumps
		this.body.velocity.x = this.runSpeed
	}

	kill() {
		if (this.damaged) {
			if (this.jumpedOn) {
				this.jumpedOn = false
				this.game.player.newHeart(this.heartType)
			}

			if (!this.game.titleShown && false) {
				this.game.interface.showTitle()
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
