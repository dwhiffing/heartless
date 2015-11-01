var typebunchSize, randT, types

import White from './entity/White.js'
import Red from './entity/Red.js'
import Yellow from './entity/Yellow.js'
import Blue from './entity/Blue.js'

export default class Spawner {
  constructor() {
    game.enemyGroup = game.add.group()
    types = [White, Red, Yellow, Blue]

    for (var i = 0; i < 3; i++) {
  		for (var j = 0; j < types.length; j++) {
  			var enemy = new types[j]
  			game.enemyGroup.add(enemy)
  		}
  	}

    game.time.events.loop(Phaser.Timer.SECOND*2, this.release, this)
  }
  release() {
    let type = 0, launchTimer = 1000, bunchSize = 3

  	for (var i = bunchSize; i > 0; i--) {
  		let enemy = game.enemyGroup.getFirstDead()
  		if (enemy != null) {
  			enemy.recycle(type)
  		}
  	}
  }
}
