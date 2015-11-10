const frames = ['white','red','yellow','blue','purple','green','orange']

export default class Arrow extends Phaser.Sprite {
  constructor(game) {
    super(game, -100, -100, 'arrow', 0)
    this.game = game
    frames.forEach((f, i) => this.animations.add(f, [i]))
    game.physics.enable(this)
    this.stats = {}
    this.body.allowGravity = false
    this.anchor.setTo(0, 0.5)
    this.hitSound = this.game.add.audio('hurt3')
    this.missSound = this.game.add.audio('heart')
    this.missSound.volume = 0.1
  }

  shoot(opts={}) {
  	this.reset(opts.x, opts.y)
    this.startX = this.x
    this.stats = opts

  	this.health = opts.health
  	this.animations.play(opts.type)
    this.range = opts.range + this.game.rnd.integerInRange(this.range * -6)
    this.scale.setTo(opts.sizeX, opts.sizeY)

  	this.body.velocity.x = -opts.speed + this.getSpeed(opts.spreadX)
  	this.body.velocity.y = this.getSpeed(opts.spreadY)

    opts.callback(this)
  	this.lastEnemy = null
  }

  getSpeed(spread) {
    return Math.random() * (spread - (-spread) + 1) + (-spread)
  }

  update() {
    let min = this.startX - this.stats.range + Math.random()*20
    let max = this.game.width/2 + 500
    if (this.x < min || this.x > max) {
      this.kill(true)
    }
  }

  kill(miss) {
    if (!this.alive) return
    if (this.stats.radius > 0) {
      if (miss) {
        this.missSound.play()
      } else {
        this.hitSound.play()
      }
      this.game.blasts.get(this.x, this.y, this.stats.radius/12)
      this.getInRangeForDamage().forEach(e => e.damage(this.stats.power))
    }
    super.kill()
  }

  getInRangeForDamage() {
    return this.game.enemies.filter((r) => {
      return this.dist(r) < this.stats.radius*10
    }).list
  }

  dist(target) {
    return this.game.math.distance(this.x, this.y, target.x, target.y);
  }

  overlapEntity(entity) {
  	if (this.lastEnemy != entity && !entity.jumping) {
  		this.lastEnemy = entity
      entity.damage(this.stats.power, false, this.stats.slow, this.stats.push)
  		this.damage(1)
  	}
  }
}
