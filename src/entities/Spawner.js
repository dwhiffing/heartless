var typebunchSize, randT, types

import White from './entity/White.js'
import Red from './entity/Red.js'
import Yellow from './entity/Yellow.js'
import Blue from './entity/Blue.js'
import helpers from '../lib/helpers'

export default class Spawner {
  constructor() {
    game.enemyGroup = game.add.group()
    types = [White, Red, Yellow, Blue]
    this.rates = [1,1,1,1]
    this._rates = [1,1,1,1]
    types.forEach(type => {
      for (var i = 0; i < 25; i++) {
        game.enemyGroup.add(new type)
      }
    })
    game.time.events.loop(500, this.release, this)
  }
  release() {
    this._rates.forEach((rate, type) => {
      if (this.rates[type] <= 0) return
      this._rates[type]--
      if (this._rates[type] <= 1) {
        this._rates[type] = 10 - this.rates[type]
        this.spawn(type)
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
    game.ui[helpers.typeToSting(type)+'RateText'].text = this.rates[type]
  }
  spawn(type) {
    let enemy = game.enemyGroup.filter(enemy => {
      return !enemy.alive && enemy.heartType === type
    }).list[0]
    if (enemy) {
      enemy.reset()
    }
  }
}
