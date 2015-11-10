import Entity from './Entity'
import helpers from'./helpers'
import constants from './Constants'

let numLanes = 2

// should make lanes more dynamic
export default class Enemy extends Entity {
	constructor(game) {
		super(game, -200, -200, 'enemy')
		this.score = 100
		this.name = "Enemy"
		this.stats = constants.enemy
		this.animations.add("skeleton", [0, 1, 2, 1], 4, true)
		this.animations.add("soldier", [3, 4, 5, 4], 4, true)
		this.animations.add("helmet", [6, 7, 8, 7], 4, true)
		this.animations.add("fly", [9, 10, 11, 10], 4, true)
		this.kill()
		this.startY = this.game.height/4
		this.laneSize = (this.startY-50) / numLanes
	}

	update() {
	  this.z = this.y
		if(this.x > this.game.width/2+50) {
	    this.kill()
	  }
		if (this.body.velocity.x < this.maxSpeed) {
			this.body.velocity.x += 0.05
		}
		Entity.prototype.update.call(this)
	}

	reset(x, y, type, color) {
		this.tint = constants.enemy.hex[color]
		if (typeof type == "number") {
			type = constants.enemy.names[type]
		}
		this.maxHealth = this.stats[type].maxHealth
		this.numJumps = this.stats[type].numJumps
		this.minSpeed = this.stats[type].minSpeed
		this.maxSpeed = this.stats[type].maxSpeed
		this.enemyTimeout = false

		this.heartType = color
		this.runSpeed = this.game.rnd.integerInRange(this.minSpeed, this.maxSpeed)

		let frameRate = parseInt(this.runSpeed/25, 10)
		frameRate = Math.max(2, frameRate)
		this.animations.play(type,frameRate)

		let y = this.game.height/4 + (this.laneSize * this.game.rnd.integerInRange(1, numLanes))
		console.log(y)
	  super.reset(-30, y, this.maxHealth)
		this.jumpDamage = this.health/this.numJumps
		this.body.velocity.x = this.runSpeed
	}

	getLane() {
		return this.y / this.laneSize - 8
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

			this.game.blasts.get(this.x, this.y-20, 0.2, constants.enemy.hex[this.heartType])
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
		if (this.x > 50) {
			this.body.velocity.x /= slow
			if (!this.jumpedOn) {
				this.game.add.tween(this).to( {x: this.x-push}, 500, Phaser.Easing.Quadratic.Out, true).start()
			}
		}
	}

	switchLane() {
		let size = this.laneSize

		//check below
		//check above
		let amt = this.game.rnd.integerInRange(1, 2) == 1 ? this.y-size : this.y+size

		if (amt >= this.startY + numLanes * this.laneSize) {
			size = -this.laneSize
		} else if (amt <= this.startY) {
			size = this.laneSize
		}
		this.game.add.tween(this).to({y:amt + size}, 300, Phaser.Easing.Quadratic.Out, true).start()

		let speed = this.body.velocity.x
		this.body.velocity.x = 5
		this.game.time.events.add(300, () => this.body.velocity.x = speed)
	}

	overlapEnemy(enemy) {
		// should check if can move up/down based on number of lanes and whether there are enemies in the way or not
		// if it cant move up or down, it should match the speed of the enemy in front of it
		// if it can move up or down, it should slow down to a set speed and move to that lane at a speed based on the run speed
		if (this.enemyTimeout || this === enemy) return
		if (this.x > enemy.x || this.y !== enemy.y) return

		this.enemyTimeout = true
		this.game.time.events.add(500, () => this.enemyTimeout = false)

		this.switchLane()
	}

	jump() {
	  super.jump()
	}
}
