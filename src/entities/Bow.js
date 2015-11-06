// a bow manages an entities ability to shoot arrows
// and what stats those arrows have
import helpers from '../lib/helpers'
import Arrow from '../entities/Arrow'

export default class Bow {
	constructor(parent) {
		this.parent = parent
		this.name = "bow"
		this.game = parent.game
	  this.event = this.game.time.events.loop(Phaser.Timer.SECOND, this.parent.shoot, this.parent);

		this.game.arrows = this.game.add.group()
    this.game.arrows.name = "arrows"
    this.game.arrows.classType = Arrow
    this.game.arrows.createMultiple(100, 'arrow', 0)

		this.update();
	}

	update() {
		let hearts = this.game.hearts.children.filter(h => h.alive)
		let w = hearts.filter(h => h.type == 0).length
		let r = hearts.filter(h => h.type == 1).length
		let y = hearts.filter(h => h.type == 2).length
		let b = hearts.filter(h => h.type == 3).length

		this.game.ui.whiteHeartText.text = w
		this.game.ui.redHeartText.text = r
		this.game.ui.yellowHeartText.text = y
		this.game.ui.blueHeartText.text = b
		this.stats={}

		// color of arrow
		let type = 0,
		// the scale of the bullet
		size = 1.5,
		// the amount of damage the bullets do
		power = 1,
		// the size of the explosion the arrow makes
		radius = 1,
		// the speed that the bullets move
		speed = 200,
		// the amount milliseconds between firing
		rate = 1000,
		// the amount a hit devides the enemy speed
		slow = 15,
		// the amount of bullets fired per shot
		shell = 1,
		// how far bullets will travel
		range = this.game.width/7,
		// the amount that the bullets deviate up/down
		spreadY = 20,
		// the amount that the bullet speed deviates
		spreadX = 20,
		// the amount of enemies a bullet can hit before dying
		pierce = 1,
		push = 20,

		sizeX = null,
		sizeY = null,
		callback = () => {}

		// first check if hearts are pure, then set up according to proportions
		if (w == 0 && r > 0 && y == 0 && b == 0) {
			type = 1
			size = size + 0.28 * r
			power = power + 2 * r
			radius = radius + 0.5 * r
			speed = speed - 5 * r
			rate = rate + 90 * r
			push = push + 10 * r
			range = range + 4 * r
			spreadY = spreadY + 0.2 * r
			spreadX = spreadX + 3 * r
			pierce = Math.floor(2 * r)+1
		} else if (w == 0 && r == 0 && y > 0 && b == 0) {
			type = 2
			speed = speed + 12 * y
			rate = 50 + Math.pow(16 - y, 2)
			radius = radius + 0.02 * y
			range = range - 7 * y
			slow = 1
			spreadY = spreadY + 0.1 * y
			spreadX = spreadX + 5 * y
		} else if (w == 0 && r == 0 && y == 0 && b > 0) {
			type = 3
			size = size - 0.07 * b
			power = b/2
			radius = radius - 0.01 * b
			speed = speed + 5 * b
			shell = shell + Math.ceil(1.2 * b)
			rate = rate + 15 * b
			range = range - 2 * b
			spreadY = spreadY + 10 * b
			spreadX = spreadX + 3 * b
			pierce = pierce + 2 * b
		} else if (w || r || y || b) {
			// finally, set up for a mix instead
			// mix is similar to pure effects but weaker
			type = 0
			size = size + r/4 - b/20
			power = power + r*4 - b + y*2
			radius = radius + r/2.5 - y/2 - b/2
			speed = speed - r*3 + y*20 - b
			shell = shell + b/2
			slow = 1
			rate = rate + r*4 - y*100 + b*4
			range = range + r*3 - y*10 - b*10
			spreadX = spreadX - r*2 + b*2
			spreadY = spreadY - r*2 + b*1.5
			pierce = pierce + r*2 - b*2

			power += w
		}
		if (w == 0 && y == 0 && r > 0 && b > 0 && r == b) {
			// next check if hearts are balanced with a secondary
			// purple - something - slower falling
			type = 4
			// size ++
			// power =
			// radius -
			// speed ++
			// shell +
			// rate =
			// range -
			// spreadX -
			// spreadY -
			// pierce +++
		}
		if (w == 0 && r == 0 && y > 0 && b > 0 && y == b) {
			// green - split / double hearts
			type = 5
			// size --
			// power +
			// radius --
			// speed +
			// shell ++
			// rate =
			// range -
			// spreadX -
			// spreadY -
			// pierce =
		}
		if (w == 0 && b == 0 && r > 0 && y > 0 && r == y) {
			// orange - laser / faster
			type = 6
			// size = 1 + r *0.25
			power = 3 + r*2
			radius = 0
			slow = 1 + r*.2
			speed = 200
			rate = 50
			spreadX = 0
			sizeX = 60
			sizeY = 1 + r/3
			range = 0
			spreadY = 0
			pierce = 100
			callback = function(bullet) {
				bullet.body.width = this.game.width/2
	      bullet.anchor.setTo(1, 0.5)
			}
		}

		this.stats.type = helpers.typeToSting(type)
		this.stats.sizeX = sizeX || Math.clamp(size, 1, 5)
		this.stats.sizeY = sizeY || Math.clamp(size, 1, 5)
		this.stats.power = Math.clamp(power, 0.1, 10)
		this.stats.radius = Math.clamp(radius, 0.5, 10)
		this.stats.speed = Math.clamp(speed, 50, 1000)
		this.stats.shell = Math.clamp(shell, 1, 30)
		this.stats.slow = Math.clamp(slow, 1, 15)
		this.stats.rate = Math.clamp(rate, 10, 3000)
		this.stats.push = Math.clamp(push, 0, 100)
		this.stats.range = Math.clamp(range, 5, 2000)
		this.stats.spreadX = Math.clamp(spreadX, 0, 50)
		this.stats.spreadY = Math.clamp(spreadY, 0, 100)
		this.stats.pierce = Math.floor(Math.clamp(pierce, 1, 100))

		this.stats.callback = callback
		this.event.delay = this.stats.rate

		console.table([this.stats])
	}

	shoot(x,y) {
		for (var i = this.stats.shell; i > 0; i--) {
			var bullet = this.game.arrows.getFirstDead()
			if (bullet) {
				let opts = Object.assign({
					x: x,
					y: y,
				},this.stats)
				bullet.shoot(opts);
			}
		}
	}
}
