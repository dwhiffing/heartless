var timer;

var PointText = function(game, opts) {
	super(10, 10, 50); kill(); color = 0xffFF00FF;
}

PointText.prototype = Object.create(Phaser.Text.prototype)
PointText.prototype.constructor = PointText;

PointText.prototype.update = function() {
	if (alive) {
		if (Timer < 0) { kill(); Timer = 40; }
		y -= 0.5; Timer--;
	}
}
PointText.prototype.recycle = function(_speed, _spread, _pierce) {
	reset(_x, _y);
	Timer = 40;
}

module.exports = PointText