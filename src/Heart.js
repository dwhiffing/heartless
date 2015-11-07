import helpers from'./helpers'

export default class Heart extends Phaser.Sprite{
  constructor(game, opts) {
    super(game, -20, -20, 'heart')
    this.anchor.set(0.5, 0.5)
    game.physics.enable(this)
    this.body.enable = false
    this.game = game
    this.dist = 35
  	this.kill()
  }

  update() {
    if (!this.alive) return

    this.x = this.game.player.x + 2 + this.dist * Math.cos(this.mAngle)
    this.y = this.game.player.y - this.game.player.height/2 + this.dist * Math.sin(this.mAngle)
    this.mAngle += 0.02
    if (this.mAngle >= 6.316) {
      this.mAngle = 0
    }
  }

  reset(type) {
  	super.reset(300, 300)
  	this.type = type
    this.tint = helpers.typeToHex(type)
    this.createTrail()
  }

  fly() {
  	var dx = (this.game.player.x) - (this.x)
  	var dy = (this.game.player.y-40) - (this.y)
  	var a = Math.atan2(dy, dx)
    this.body.enable = true
    this.body.velocity.setTo(Math.cos(a) * 250, Math.sin(a) * 250)
    this.alive = false
    this.lifespan = 160
  }

  createTrail() {
    if (!this.game.enableHeartTrails) return
    if (!this.trail) {
      this.trail = this.game.juicy.createTrail(1, 0xffffaa)
      this.trail.trailScaling = true
      this.trail.alpha = 0.35
      this.trail.trailWidth = 5
      this.game.heartTrails.add(this.trail)
    }
    this.trail.trailLength = 0
    this.game.time.events.add(200, function(){
      this.trail.trailLength = 10
    }, this)
    this.trail.target = this
    this.trail.trailColor = helpers.typeToHex(this.type)
    var self = this
    setInterval(() => {
      self.trail.addSegment(self.x, self.y)
      self.trail.redrawSegments(self.x, self.y)
    }, 50)
  }

  kill() {
    if (this.trail) {
      this.game.time.events.add(200, () => this.trail.target = null)
    }
    this.mAngle = 0
    this.body.enable = false
    super.kill()
  }
}
