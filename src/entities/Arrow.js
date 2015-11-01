var arrowPNG, spray

export default class Arrow extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, 'arrow', frame)
    this.animations.add('whi', [0])
    this.animations.add('red', [1])
    this.animations.add('yel', [2])
    this.animations.add('blu', [3])
  	spray = 40
    game.physics.enable(this)
    this.body.allowGravity = false
  }
  shoot(opts) {
    var opts = opts || {},
        x = opts.x || 0,
        y = opts.y || 0,
        speed = opts.speed || 10,
        pierce = opts.pierce || 0,
        spread = opts.spread || 0,
        power = opts.power || 1,
        frame = opts.frame || 'whi'
  	this.reset(x, y)

    this.power = opts.power

  	this.animations.play(frame)
  	this.health = pierce
  	this.body.velocity.x = -speed + Math.floor(Math.random() * (spray - ( -spray) + 1) + ( -spray))
  	this.body.velocity.y = Math.floor(Math.random() * (spread - ( -spread) + 1) + ( -spread))
  	this.lastEnemy = null
  }

  update(_enemy) {
    if (this.x < -10) this.kill()
  }

  hit(_enemy) {
  	if (this.lastEnemy != _enemy && !_enemy.jumping) {
  		this.lastEnemy = _enemy
      _enemy.damage(this.power)
  		this.damage(1)
  	}
  }
}
