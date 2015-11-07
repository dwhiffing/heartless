var typebunchSize, randT, types

import Enemy from './Enemy.js'
import helpers from '../lib/helpers'

export default class EnemyGroup {
  constructor(game) {
    this.game = game
    game.enemies = game.add.group()
    this.rates = [1,1,1,1]
    this._rates = [1,1,1,1]

    for (var i = 0; i < 25; i++) {
      game.enemies.add(new Enemy(game))
    }

    game.time.events.loop(500, this.release, this)
  }

  create() {
    let enemy = new Enemy(this.game)
    this.game.enemies.add(enemy)
    return enemy
  }

  get(x, y, type, tint) {
    var enemy = this.game.enemies.getFirstDead() || this.create();
    enemy.reset(x, y, type, tint);
    return enemy
  }

  release() {
    this._rates.forEach((rate, type) => {
      if (this.rates[type] <= 0) return
      this._rates[type]--
      if (this._rates[type] <= 1) {
        this._rates[type] = 10 - this.rates[type]
        this.get(null, null, type, this.game.rnd.integerInRange(0,3))
      }
    })
  }

  changeRate(type, amount) {
    this.rates[type] += amount
    if (this.rates[type] < 0) {
      this.rates[type] = 0
    }
    if (this.rates[type] > 10) {
      this.rates[type] = 10
    }
    this.game.ui[helpers.typeToSting(type)+'RateText'].text = this.rates[type]
  }

}
