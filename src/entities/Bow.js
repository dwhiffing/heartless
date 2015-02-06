// a bow manages an entities ability to shoot arrows
// and what stats those arrows have
var Bow = function(parent) {
	this.parent = parent
  this.event = game.time.events.loop(Phaser.Timer.SECOND, this.parent.shoot, this.parent);
	this.resetStats();
}

Bow.prototype = Object.create(Object)
Bow.prototype.constructor = Bow;

Bow.prototype.resetStats = function() {
	// the amount of milliseconds between shots
	this.event.delay = firerate = 1000;
	// the amount of damage the bullets do
	power = 10; 
	// the speed that the bullets move
	speed = 200; 
	// the amount that the bullets deviate up/down
	spread = 10; 
	// the amount of bullets fired per shot
	shell = 1; 
	// the amount of enemies a bullet can hit before dying
	pierce = 1; 
}

Bow.prototype.updateStats = function(heartCounts) {
	var numRed = heartCounts[1];
	var numYellow = heartCounts[2];
	var numBlue = heartCounts[3];
	speed = (200 + 20 * numRed)- 4*numYellow;
	power = (2 + 1 * numRed)/(((numBlue+numYellow)/8)+1);
	pierce = 1 + Math.floor(0.5 * numRed);
	this.event.delay = firerate = 1000/((numYellow*0.5)+1);
	shell = 1 + numBlue;
	spread = Math.max(0, (10 + (3*numYellow + 6*numBlue) - (6*numRed)-speed/6));
	if (power < 1) power = 1;
}

Bow.prototype.shoot = function(x,y) {
	// pain = (game.player.numHearts / 10) * (power / 8); 
	// if (pain > 0) {
	// 	game.player.damage(pain);
	// }

	// FlxG.play(shootWAV,0.5);
	for (var i = shell; i > 0; i--) {
		var bullet = game.arrowGroup.getFirstDead();
		if (bullet) {
			var opts = {
				x: x,
				y: y,
				speed: speed,
				spread: spread,
				pierce: pierce,
				power: power,
				frame:'whi'
			}
			bullet.shoot(opts);
		}
	}
}

module.exports = Bow