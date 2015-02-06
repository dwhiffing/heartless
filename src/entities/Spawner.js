var typebunchSize, randT, types;

var White = require('./entity/White.js');
var Red = require('./entity/Red.js');
var Yellow = require('./entity/Yellow.js');
var Blue = require('./entity/Blue.js');

var Spawner = function() {
  game.enemyGroup = game.add.group();
  types = [White, Red, Yellow, Blue]
  
  for (var i = 0; i < 3; i++) {
		for (var j = 0; j < types.length; j++) {
			var enemy = new types[j];
			game.enemyGroup.add(enemy);
		}
	}

  game.time.events.loop(Phaser.Timer.SECOND*2, this.release, this);
}

Spawner.prototype.constructor = Spawner;


Spawner.prototype.release = function() {
	//intro
	type = 0; launchTimer = 1000; bunchSize = 3;
	
	for (var i = bunchSize; i > 0; i--){
		var enemy = game.enemyGroup.getFirstDead();
		if (enemy != null) {
			enemy.recycle(type);
		}
	}
}

module.exports = Spawner