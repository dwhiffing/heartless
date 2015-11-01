export default class Heart extends Phaser.Sprite{
  constructor(game, opts) {
    super(game, -20, -20, 'heart')
    this.anchor.set(0.5, 0.5)
    game.physics.enable(this)
    this.body.enable = false
    this.dist = 35
  	this.kill()
  }

  update() {
    if (!this.alive || this.flying) return

    this.x = game.player.x + 2 + this.dist * Math.cos(this.mAngle)
    this.y = game.player.y - game.player.height/2 + this.dist * Math.sin(this.mAngle)
    this.mAngle += 0.02
    if (this.mAngle >= 6.316) {
      this.mAngle = 0
    }
  }

  recycle(_type) {
  	this.reset(300, 300)
    this.mAngle = 0
  	this.type = _type
    this.body.enable = false
  	this.flying = false
    this.tint = this.typeToColour()
    this.createTrail()
  }

  fly(_enemy) {
  	var dx = (game.player.x) - (this.x)
  	var dy = (game.player.y-30) - (this.y)
  	var a = Math.atan2(dy, dx)
    this.body.enable = true
    this.body.velocity.x = Math.cos(a) * 300
    this.body.velocity.y = Math.sin(a) * 300
    this.flying = true
  	this.lifespan = 150
  }

  createTrail() {
    if (!game.enableHeartTrails) return
    if (!this.trail) {
      this.trail = game.juicy.createTrail(1, 0xffffaa)
      this.trail.trailScaling = true
      this.trail.alpha = 0.35
      this.trail.trailWidth = 5
      game.trailGroup.add(this.trail)
    }
    this.trail.trailLength = 0
    game.time.events.add(200, function(){
      this.trail.trailLength =2
    }, this)
    this.trail.target = this
    this.trail.trailColor = this.typeToColour()
    var self = this
    setInterval(() => {
      self.trail.addSegment(self.x, self.y)
      self.trail.redrawSegments(self.x, self.y)
    }, 150)
  }

  typeToColour() {
    if (this.type == 0) {
      return 0xffffff
    } else if (this.type == 1) {
      return 0xff0000
    } else if (this.type == 2) {
      return 0xffff00
    } else if (this.type == 3) {
      return 0x0000ff
    }
  }

  kill() {
    if (this.trail) {
      game.time.events.add(200, function(){
        this.trail.target = null
      }, this)
    }
    this.body.enable = false
    super.kill()
  }
}
