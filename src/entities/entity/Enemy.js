var Entity = require('./Entity.js');

// Enemy is abstract
var Enemy = function(x,y,key) {
	this.name = "Enemy";
	Entity.call(this, 200, 200, key);

	this.animations.add("walk", [0, 1, 2, 1], 2, true);
	this.animations.add("hurt", [4, 3], 10, true);	

	this.kill();
}

Enemy.prototype = Object.create(Entity.prototype)
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
  this.z = this.y;
	if(this.x > game.trueWidth+50) {
    this.kill()
  }
	Entity.prototype.update.call(this)
}

Enemy.prototype.recycle = function(_type) {
	this.spawn();
}

Enemy.prototype.spawn = function() {
  //initialize enemy
  var randX = game.rnd.integerInRange(-200, -20)
  var randY = game.rnd.integerInRange(130, 230)
  this.runSpeed = game.rnd.integerInRange(this.minSpeed, this.maxSpeed)

  this.reset(randX, randY); 
  this.body.velocity.x = this.runSpeed;
	this.jumpDamage = this.maxHealth/this.numJumps;
  this.health = this.maxHealth
}

Enemy.prototype.kill = function() {
	Entity.prototype.kill.call(this)
}

Enemy.prototype.damage = function(damage, jumpedOn) {
  if (jumpedOn) {damage = this.jumpDamage;console.log(damage, this.jumpDamage, this.health)}
	game.time.events.add(500, function() {
    this.animations.play("walk"); 
    this.alpha = 1
    this.body.velocity.x = this.runSpeed;
  }, this)
	
  this.alpha = 0.7
	this.body.velocity.x /= 4;

	Entity.prototype.damage.call(this, damage)
}

Enemy.prototype.jump = function() {
	// velocity.y = Math.floor(Math.random() * (-450 - -300 + 1) + -300);
	// FlxG.play(jumpWAV);
  Entity.prototype.jump.call(this);
}

module.exports = Enemy
