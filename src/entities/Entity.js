var jumpHeight, invTimer;

// #ntity is an abstract class that enemy and player inherit from
// its purpose is to reduce duplication between enemy/player
var Entity = function(x, y, key, group, shadowGroup) {
  Phaser.Sprite.call(this, game, x, y, key);
  
  // entity anchor is defined as the center of its 'feet'
  // ( halfway across its x, and at the bottom of its y ) // this makes jumping easier
  this.anchor.setTo(0.5, 1)
  game.physics.enable(this)
  this.body.allowGravity = false;

  this.runSpeed = 100;
  this.jumping = false;
  this.body.height = 70;
}

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.update = function() {}

Entity.prototype.move = function(dir, speed) {
  this.body.velocity[dir] = speed;
}

Entity.prototype.jump = function() {
  this.jumping = true;
  this.body.allowGravity = true;
  this.body.velocity.y = -300;
  this.animations.play("jump");
}

Entity.prototype.land = function() {
  this.jumping = false;
  this.body.allowGravity = false;
  this.body.velocity.y = 0
  this.animations.play("walk");
}

Entity.prototype.shoot = function() {
  this.bow.shoot(this.x-this.width/1.5, this.y-18)
}

Entity.prototype.damage = function(damage) {
  this.animations.play("hurt");
  // FlxG.play(hurtWAV);
  Phaser.Sprite.prototype.damage.call(this, damage)
}

Entity.prototype.kill = function() {
  if (this.shadow) {
    this.shadow.kill();
  }
  Phaser.Sprite.prototype.kill.call(this)
}

Entity.prototype.reset = function(x, y) {
  this.animations.play("walk");
  Phaser.Sprite.prototype.reset.call(this, x, y);
}

module.exports = Entity