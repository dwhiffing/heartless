import Entity from './Entity'

export default class Enemy extends Entity {
	// Enemy is abstract
	constructor(x, y, key) {
		super(200, 200, key)

		this.name = "Enemy"
		this.animations.add("walk", [0, 1, 2, 1], 2, true)
		this.animations.add("hurt", [4, 3], 10, true)
		this.kill()
	}

	update() {
	  this.z = this.y
		if(this.x > game.halfWidth+50) {
	    this.kill()
	  }
		Entity.prototype.update.call(this)
	}

	recycle(_type) {
		this.spawn()
	}

	spawn() {
	  var randX = game.rnd.integerInRange(-200, -20)
	  var randY = game.rnd.integerInRange(130, 230)
	  this.runSpeed = game.rnd.integerInRange(this.minSpeed, this.maxSpeed)

	  this.reset(randX, randY)
	  this.body.velocity.x = this.runSpeed
		this.jumpDamage = this.maxHealth/this.numJumps
	  this.health = this.maxHealth
	}

	kill() {
		super.kill()
	}

	damage(damage, jumpedOn) {
		super.damage(damage)

	  if (jumpedOn) {
			damage = this.jumpDamage
			console.log(damage, this.jumpDamage, this.health)
		}

		game.time.events.add(500, function() {
	    this.animations.play("walk")
	    this.alpha = 1
	    this.body.velocity.x = this.runSpeed
	  }, this)

	  this.alpha = 0.7
		this.body.velocity.x /= 4
	}

	jump() {
	  super.jump()
	}
}
