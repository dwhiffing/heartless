export default class Arrow extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, 'arrow', frame)
    this.animations.add('white', [0])
    this.animations.add('red', [1])
    this.animations.add('yellow', [2])
    this.animations.add('blue', [3])
    this.animations.add('purple', [4])
    this.animations.add('green', [5])
    this.animations.add('orange', [6])
    game.physics.enable(this)
    this.body.allowGravity = false
  }
  shoot(opts) {
    var opts = opts || {}, x = opts.x || 0, y = opts.y || 0
  	this.reset(x, y)
    this.power = opts.power
    this.startX = this.x
    this.range = opts.range + Math.random() * 20
    this.radius = opts.radius/12
  	this.animations.play(opts.type)
    this.scale.setTo(opts.size, opts.size)
  	this.health = opts.pierce
  	this.body.velocity.x = -opts.speed + Math.floor(
      Math.random() * (opts.spreadX - ( -opts.spreadX) + 1) + ( -opts.spreadX)
    )
  	this.body.velocity.y = Math.floor(
      Math.random() * (opts.spreadY - ( -opts.spreadY) + 1) + ( -opts.spreadY)
    )
  	this.lastEnemy = null
  }

  update() {
    if (this.x < this.startX - this.range || this.x > game.halfWidth + 10) {
      this.kill()
    }
  }

  kill() {
    if (!this.alive) return
    if (this.radius > 0) {
      game.blasts.get(this.x, this.y, this.radius)
      this.getInRangeForDamage().forEach(enemy => {
        enemy.damage(this.power)
      })
    }
    super.kill()
  }

  getInRangeForDamage() {
    return game.enemyGroup.filter((r) => this.getDist(r) < this.radius*100).list
  }

  getDist(thing) {
    return game.math.distance(this.x, this.y, thing.x, thing.y);
  }

  overlapEntity(entity) {
  	if (this.lastEnemy != entity && !entity.jumping) {
  		this.lastEnemy = entity
      entity.damage(this.power)
  		this.damage(1)
  	}
  }
}
