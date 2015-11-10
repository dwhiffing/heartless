// a bow manages an entities ability to shoot arrows
// and what stats those arrows have
import helpers from'./helpers'
import Arrow from './Arrow'
import constants from './Constants'

export default class Bow {
	constructor(parent) {
		this.parent = parent
		this.name = "bow"
		this.game = parent.game
	  this.event = this.game.time.events.loop(Phaser.Timer.SECOND, this.parent.shoot, this.parent);
		this.data = constants.bow
		this.shootSound = this.game.add.audio("shoot")

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

		this.stats = Object.assign({}, this.data.base)
		let newStats = {}

		// first check if hearts are pure, then set up according to proportions
		if (w == 0 && r > 0 && y == 0 && b == 0) {
			// pure red
			newStats = this.data.red(r)
		} else if (w == 0 && r == 0 && y > 0 && b == 0) {
			// pure yellow
			newStats = this.data.yellow(y)
		} else if (w == 0 && r == 0 && y == 0 && b > 0) {
			// pure blue
			newStats = this.data.blue(b)
		} else if (w || r || y || b) {
			// mutt
			newStats = this.data.white(r,y,b)
		}
		if (w == 0 && y == 0 && r > 0 && b > 0 && r == b) {
			// pure purple
			newStats = this.data.purple(r,b)
		}
		if (w == 0 && r == 0 && y > 0 && b > 0 && y == b) {
			// green - split / double hearts
			newStats = this.data.green(y,b)
		}
		if (w == 0 && b == 0 && r > 0 && y > 0 && r == y) {
			// orange - laser / faster
			newStats = this.data.orange(r,y)
		}

		Object.keys(newStats).forEach((n) => {
			n = n.replace('abs_', '')
			let abs = false
			if (newStats['abs_'+n]) {
				abs = true
			}
			let things = newStats['abs_'+n] ? newStats['abs_'+n] : newStats[n]
			if (typeof this.stats[n] !== 'number' || abs) {
				this.stats[n] = things
			} else {
				this.stats[n] = this.data.base[n] + things
			}
		}, {})

		this.event.delay = this.stats.rate
		console.table([this.stats])
	}

	shoot(x,y) {
		this.shootSound.play()
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
