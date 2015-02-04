var firerate, power, speed, pain, spread, shell, shootTimer, pierce;
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
	this.event.delay = firerate = 1000;
	power = 10;
	speed = 200;
	spread = 10;
	shell = 1;
	pierce = 1;
	shootTimer = 90; 
}

Bow.prototype.updateStats = function(heartCounts) {
	var numRed = heartCounts[1];
	var numYellow = heartCounts[2];
	var numBlue = heartCounts[3];
	power = (10 + 0.5 * numRed)/numBlue;
	pierce = 1 + Math.floor(0.5 * numRed);
	this.event.delay = firerate = 1000/(numYellow*1.3)+1;
	shell = 1 + numBlue;
	spread = 10 - (6*numRed) + (3*numYellow) + (6*numBlue);

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
				frame:'whi'
			}
			bullet.shoot(opts);
		}
	}
}

module.exports = Bow