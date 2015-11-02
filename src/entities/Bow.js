// a bow manages an entities ability to shoot arrows
// and what stats those arrows have
import helpers from '../lib/helpers'
export default class Bow {
	constructor(parent) {
		this.parent = parent
	  this.event = game.time.events.loop(Phaser.Timer.SECOND, this.parent.shoot, this.parent);
		this.update();
	}

	update() {
		let hearts = game.hearts.children.filter(h => h.alive)
		let w = hearts.filter(h => h.type == 0).length
		let r = hearts.filter(h => h.type == 1).length
		let y = hearts.filter(h => h.type == 2).length
		let b = hearts.filter(h => h.type == 3).length

		game.ui.whiteHeartText.text = w
		game.ui.redHeartText.text = r
		game.ui.yellowHeartText.text = y
		game.ui.blueHeartText.text = b
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
		rate = 1500,
		// the amount of bullets fired per shot
		shell = 1,
		// how far bullets will travel
		range = game.halfWidth * 0.7,
		// the amount that the bullets deviate up/down
		spreadY = 10,
		// the amount that the bullet speed deviates
		spreadX = 0,
		// the amount of enemies a bullet can hit before dying
		pierce = 1

		// first check if hearts are pure, then set up according to proportions
		if (r > 0 && y == 0 && b == 0) {
			type = 1
			size = size + 0.28 * r
			power = power + 10 * r
			radius = radius + 0.5 * r
			speed = speed - 5 * r
			rate = rate + 90 * r
			range = range - 4 * r
			spreadY = spreadY + 0.2 * r
			spreadX = spreadX + 3 * r
			pierce = Math.floor(2 * r)+1
		} else if (r == 0 && y > 0 && b == 0) {
			type = 2
			speed = speed + 12 * y
			power = 50 + Math.pow(16 - y, 2)
			rate = 50 + Math.pow(16 - y, 2)
			radius = radius + 0.02 * y
			range = range - 7 * y
			spreadY = spreadY + 0.1 * y
			spreadX = spreadX + 5 * y
		} else if (r == 0 && y == 0 && b > 0) {
			type = 3
			size = size - 0.07 * b
			power = power + b / 10
			radius = radius - 0.01 * b
			speed = speed + 5 * b
			shell = shell + Math.ceil(1.2 * b)
			rate = rate + 15 * b
			range = range - 10 * b
			spreadY = spreadY + 10 * b
			spreadX = spreadX + 3 * b
			pierce = pierce + 2 * b
		}
		if (r > 0 && b > 0 && r == b) {
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
		} else if (y > 0 && b > 0 && y == b) {
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
		} else if (r > 0 && y > 0 && r == y) {
			// orange - laser / faster
			type = 6
			// size ++
			// power ++
			// radius +
			// speed -
			// shell =
			// rate -
			// range --
			// spreadX =
			// spreadY =
			// pierce +
		} else {
			// finally, set up for a mix instead
			// type = 0
			// speed = (80 + 20 * r)- 4*y;
			// power = (2 + 1 * r)/(((b+y)/8)+1);
			// pierce = 1 + Math.floor(0.5 * r);
			// rate = 1500/((y*0.5)+1);
			// shell = 1 + b;
			// spray = Math.max(0, (10 + (3*y + 6*b) - (6*r)-speed/6));
			// spread = Math.max(0, (10 + (3*y + 6*b) - (6*r)-speed/6));
			// range = game.halfWidth*0.4 - 25 * b
		}

		this.stats.type = helpers.typeToSting(type)
		this.stats.size = size
		this.stats.power = power
		this.stats.radius = radius
		this.stats.speed = speed
		this.stats.shell = shell
		this.stats.rate = rate
		this.event.delay = rate
		this.stats.range = range
		this.stats.spreadX = spreadX
		this.stats.spreadY = spreadY
		this.stats.pierce = pierce
		console.table([this.stats])
	}

	shoot(x,y) {
		for (var i = this.stats.shell; i > 0; i--) {
			var bullet = game.arrowGroup.getFirstDead()
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
