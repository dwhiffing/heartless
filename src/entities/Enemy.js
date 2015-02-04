var score, damage, numJumps, maxHealth, maxSpeed, minSpeed;
var Entity = require('../entities/Entity.js');

// Enemy is abstract
var Enemy = function(key) {
	var key = "skeleton";
	this.name = "Enemy";
	this.type = 0;
	Entity.call(this, 200, 200, key);

	this.animations.add("walk", [0, 1, 2, 1], 2, true);
	this.animations.add("hurt", [4, 3], 20, true);	

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
	numJumps = 1;		
	this.health = 10;
	minSpeed = 45;
	maxSpeed = 95;

	this.spawn();
}

Enemy.prototype.spawn = function() {
	maxHealth = this.health;
	this.jumpDamage = maxHealth/numJumps;

	//initialize enemy
	var randX = game.rnd.integerInRange(-200, -20)
	var randY = game.rnd.integerInRange(130, 230)
	var randV = game.rnd.integerInRange(minSpeed, maxSpeed)

	this.reset(randX, randY); 
	this.body.velocity.x = randV
}

Enemy.prototype.kill = function() {
	// game.player.updateScore(x, y, score,this);
	// if(game.player.numHearts<80) {
		// game.playerGun.changeGun(type);
	// }
	Entity.prototype.kill.call(this)
}

Enemy.prototype.damage = function(damage) {
	game.time.events.add(900, function() {
    this.animations.play("walk"); 
    this.alpha = 1
    this.body.velocity.x = this.runSpeed;
  }, this)
	
  this.alpha = 0.8
	this.body.velocity.x /= 2;

	Entity.prototype.damage.call(this, damage)
}

Enemy.prototype.jump = function() {
	// velocity.y = Math.floor(Math.random() * (-450 - -300 + 1) + -300);
	// FlxG.play(jumpWAV);
  Entity.prototype.jump.call(this);
}

module.exports = Enemy
