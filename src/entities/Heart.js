var type, mAngle, dist;

var Heart = function(game, opts) {
  Phaser.Sprite.call(this, game, -20, -20, "heart");
	this.anchor.set(0.5, 0.5)
  dist = 35;
  this.alpha = 0.9;
  game.physics.enable(this);
  this.body.enable = false;
	this.kill();
}

Heart.prototype = Object.create(Phaser.Sprite.prototype)
Heart.prototype.constructor = Heart;

Heart.prototype.update = function() {
  if (this.alive) {
    if (!this.flying) {
      this.x = game.player.x+2 + dist * Math.cos(this.mAngle);
      this.y = game.player.y - game.player.height/2 + dist * Math.sin(this.mAngle);
      this.mAngle += 0.02;
      if (this.mAngle >= 6.316) this.mAngle = 0;
    }
  }
}

Heart.prototype.recycle = function(_type) {
	this.reset(300, 300);
  this.mAngle = 0;
	type = _type;
  this.body.enable = false;
	this.flying = false;
  this.tint = this.typeToColour(type)
  this.createTrail(type);
}

Heart.prototype.fly = function(_enemy) {
	var dx = (game.player.x) - (this.x);
	var dy = (game.player.y-30) - (this.y);
	var a = Math.atan2(dy, dx);
  this.body.enable = true;
  this.body.velocity.x = Math.cos(a) * 300; 
  this.body.velocity.y = Math.sin(a) * 300;
  this.flying = true;
	this.lifespan = 150;
}

Heart.prototype.createTrail = function(type) {
  if (!game.enableHeartTrails) return
  if (!this.trail) {
    this.trail = game.juicy.createTrail(1, 0xffffaa);
    this.trail.trailScaling = true;
    this.trail.alpha = 0.35;
    this.trail.trailWidth = 5;
    game.trailGroup.add(this.trail);
  }
  this.trail.trailLength = 0; 
  game.time.events.add(200, function(){
    this.trail.trailLength = 10;
  }, this)
  this.trail.target = this
  this.trail.trailColor = this.typeToColour(type)
}

Heart.prototype.typeToColour = function(type) {
  if (type == 0) {
    return 0xffffff
  } else if (type == 1) {
    return 0xff0000
  } else if (type == 2) {
    return 0xffff00
  } else if (type == 3) {
    return 0x0000ff
  }
}

Heart.prototype.kill = function() {
  if (this.trail) {
    game.time.events.add(200, function(){
      this.trail.target = null;
    }, this)
  }
  this.body.enable = false;
  Phaser.Sprite.prototype.kill.call(this);
}
module.exports = Heart