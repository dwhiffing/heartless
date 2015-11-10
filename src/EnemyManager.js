var typebunchSize, randT, types

import Enemy from './Enemy.js'
import constants from'./Constants'

export default class EnemyManager {
  constructor(game) {
    this.game = game
    game.enemies = game.add.group()
    this.rates = [1,1,1,1]
    this._rates = [1,1,1,1]

    for (var i = 0; i < 55; i++) {
      game.enemies.add(new Enemy(game))
    }

    game.time.events.loop(500, this.release, this)
  }

  create() {
    let enemy = new Enemy(this.game)
    this.game.enemies.add(enemy)
    enemy.kill()
    return enemy
  }

  get(x, y, type, tint) {
    var enemy = this.game.enemies.getFirstDead();
    if (!enemy) return false

    enemy.reset(x, y, type, tint);
    return enemy
  }

  release() {
    this._rates.forEach((rate, type) => {
      if (this.rates[type] <= 0) return
      this._rates[type]--
      if (this._rates[type] <= 1) {
        this._rates[type] = 15 - this.rates[type]
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
    this.game.ui[constants.enemy.colors[type]+'RateText'].text = this.rates[type]
  }

}
