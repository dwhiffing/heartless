// a bow manages an entities ability to shoot arrows
// and what stats those arrows have
export default class Bow {
	constructor(parent) {
		this.parent = parent
	  this.event = game.time.events.loop(Phaser.Timer.SECOND, this.parent.shoot, this.parent);
		this.resetStats();
	}

	resetStats() {
		// the amount of milliseconds between shots
		this.event.delay = 1000;
		// the amount of damage the bullets do
		this.power = 10;
		// the speed that the bullets move
		this.speed = 200;
		// the amount that the bullets deviate up/down
		this.spread = 10;
		// the amount of bullets fired per shot
		this.shell = 1;
		// the amount of enemies a bullet can hit before dying
		this.pierce = 1;
	}

	update() {
		let hearts = game.heartGroup.children.filter(h => h.alive)
		let numRed = hearts.filter(h => h.type == 1).length
		let numYellow = hearts.filter(h => h.type == 2).length
		let numBlue = hearts.filter(h => h.type == 3).length

		this.speed = (200 + 20 * numRed)- 4*numYellow;
		this.power = (2 + 1 * numRed)/(((numBlue+numYellow)/8)+1);
		this.pierce = 1 + Math.floor(0.5 * numRed);
		this.event.delay = 1000/((numYellow*0.5)+1);
		this.shell = 1 + numBlue;
		this.spread = Math.max(0, (10 + (3*numYellow + 6*numBlue) - (6*numRed)-this.speed/6));

		if (this.power < 1) {
			this.power = 1;
		}
	}

	shoot(x,y) {
		for (var i = this.shell; i > 0; i--) {
			var bullet = game.arrowGroup.getFirstDead();
			if (bullet) {
				var opts = {
					x: x,
					y: y,
					speed: this.speed,
					spread: this.spread,
					pierce: this.pierce,
					power: this.power,
					frame: 'whi'
				}
				bullet.shoot(opts);
			}
		}
	}
}
