var typebunchSize, randT;

var Spawner = function() {
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

Spawner.prototype.setStats = function() {
	var between = function(a, b) { return game.score >= min && game.score < max }
	//start of game
	if (between(50, 1500)) { 
		type = 0; launchTimer = 180; bunchSize = 2;
	} //only reds
	else if (between(1500, 3000)) { 
		type = 1; launchTimer = 180; bunchSize = 2;
	} //only yellows
	else if (between(3000, 4500)) { 
		type = 2; launchTimer = 180; bunchSize = 2;
	} //only blues
	else if (between(4500, 6000)) { 
		type = 3; launchTimer = 180; bunchSize = 2;
	} //end of intro
	else if (between(6000, 10000)) { 
		type = 0; if (randT >= 40) type = 1; if (randT > 60) type = 2; if (randT > 80) type = 3; 
		launchTimer = 180; bunchSize = 3;
	} //main spawner
	else if (between(10000, 100000)) { 
		type = 0; if (randT >= 25) type = 1; if (randT > 55) type = 2; if (randT > 75) type = 3; 
		launchTimer = 160; bunchSize = 3;
	} //main spawner
	else if (between(100000, 700000) || between(1000000, 5000000)) { 
		type = 0; if (randT >= 10) type = 1; if (randT > 40) type = 2; if (randT > 70) type = 3; 
		launchTimer = 140; bunchSize = 4;
	} //army of reds
	else if (between(700000, 800000)) { 
		type = 1; launchTimer = 120; bunchSize = 5;
	} //army of yellows
	else if (between(800000, 900000)) { 
		type = 2; launchTimer = 120; bunchSize = 5;
	} //army of blues
	else if (between(900000, 1000000)) { 
		type = 3; launchTimer = 120; bunchSize = 5;
	} //flood until end of game
	else {
		launchTimer = 10; bunchSize = 9;
	}
}

module.exports = Spawner