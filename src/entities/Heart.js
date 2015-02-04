var heartPNG, colour, type, mAngle;

var Heart = function(game, opts) {
  Phaser.Sprite.call(this, game, -20, -20, "heart");
	type = 0;
	this.flying = false;
	this.anchor.set(0.5,0.5)
	this.animations.add("whi", [0], 0);
	this.animations.add("blu", [1], 0);
	this.animations.add("red", [2], 0);
	this.animations.add("yel", [3], 0);
	this.mAngle = 5.5;
	// this.trail = game.juicy.createTrail(1, 0xffffaa);
  // this.trail.trailScaling = true;
  // this.trail.alpha = 0.6;
  // game.trailGroup.add(this.trail);
	this.heartDist = 35;
	this.alpha = 0.9;
  game.physics.enable(this);
  this.allowGravity = false;
  // this.trail.target = this
	this.kill();
}

Heart.prototype = Object.create(Phaser.Sprite.prototype)
Heart.prototype.constructor = Heart;

Heart.prototype.update = function() {
	if (this.alive) {
		if (!this.flying) {
			this.body.velocity.x = this.veloX;
			this.body.velocity.y = this.veloY;
			this.x = game.player.x+2 + this.heartDist * Math.cos(this.mAngle);
			this.y = game.player.y - game.player.height/2 + this.heartDist * Math.sin(this.mAngle);
			this.mAngle += 0.02;
			if (this.mAngle >= 6.316)this.mAngle = 0;
		}
	}
}

Heart.prototype.recycle = function(_type) {
	// this.trail.trailLength = 0;	
	// game.time.events.add(200, function(){
	// 	this.trail.trailLength = 10;
	// }, this)
	this.reset(300, 300);
  this.veloX = 0
  this.veloY = 0

	this.startx = game.player.x + this.heartDist * Math.cos(this.mAngle);
	type = _type;
	this.flying = false;
 	if (type == 0) {
	 this.animations.play("whi");
  	// this.trail.trailColor = 0xffffff
	} else if (type == 1) {
	 this.animations.play("red");
  	// this.trail.trailColor = 0xff0000
	} else if (type == 2) {
	 this.animations.play("yel");
  	// this.trail.trailColor = 0xffff00
	} else if (type == 3) {
	 this.animations.play("blu");
  	// this.trail.trailColor = 0x0000ff
	}
}

Heart.prototype.fly = function(_enemy) {
	var dx = (game.player.x) - (this.x);
	var dy = (game.player.y) - (this.x);
	var a = Math.atan2(dy, dx);

	// game.time.add(1000, function(){
 //    this.kill();
 //  }, this)
	console.log("test")


 	this.veloX = Math.cos(a) * 300; 
 	this.veloY = Math.sin(a) * 300;
	this.flying = true;
}

module.exports = Heart