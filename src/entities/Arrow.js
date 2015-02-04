var arrowPNG, spray;

var Arrow = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, "arrow", frame);
  this.animations.add('whi', [0]);
  this.animations.add('red', [1]);
  this.animations.add('yel', [2]);
  this.animations.add('blu', [3]);
	spray = 40;
  game.physics.enable(this)
  this.body.allowGravity = false;

}

Arrow.prototype = Object.create(Phaser.Sprite.prototype)
Arrow.prototype.constructor = Arrow;

Arrow.prototype.shoot = function(opts) {
  var opts = opts || {},
      x = opts.x || 0,
      y = opts.y || 0,
      speed = opts.speed || 10,
      pierce = opts.pierce || 0,
      spread = opts.spread || 0,
      frame = opts.frame || 'whi';
	this.reset(x, y)

  this.power = 1;
  this.lifespan = 4000;

	this.animations.play(frame);
	this.health = 1
	this.body.velocity.x = -speed + Math.floor(Math.random() * (spray - ( -spray) + 1) + ( -spray));
	this.body.velocity.y = Math.floor(Math.random() * (spread - ( -spread) + 1) + ( -spread));
	this.lastEnemy = null;
}

Arrow.prototype.hit = function(_enemy) {
	if (this.lastEnemy != _enemy && !_enemy.jumping) {
		this.lastEnemy = _enemy;
    _enemy.damage(0.5)
		this.damage(1);
	};
}

module.exports = Arrow