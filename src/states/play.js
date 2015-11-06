import Player from '../entities/entity/Player'
import EnemyManager from '../entities/EnemyManager'
import HeartManager from '../entities/HeartManager'
import InputManager from '../entities/InputManager'
import Background from '../entities/Background'
import Interface from '../entities/Interface'
import BlastGroup from '../entities/BlastGroup'
import DisplayGroup from '../lib/DisplayGroup'
import helpers from '../lib/helpers'

export default {
  create(game) {
    Math.clamp = (a,b,c) => Math.max(b,Math.min(c,a))

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = 270

    game.backgroundManager = new Background(game)
    game.inputManager = new InputManager(game)
    game.blasts = new BlastGroup(game)
    game.enemyManager = new EnemyManager(game)
    game.interface = new Interface(game)
    game.heartManager = new HeartManager(game)
    game.player = new Player(game, game.width/2-200, game.width/8)

    game.entityGroup = new DisplayGroup(game, 'entityGroup',[game.enemies, game.player])

    // game.enableHeartTrails = true
    game.debugBody = false
  },

  update() {
    this.game.inputManager.update()

    this.game.entityGroup.sort('z', Phaser.Group.SORT_ASCENDING)

    this.game.physics.arcade.overlap(
      this.game.player, this.game.enemies,
      (p, e) => {p.overlapEntity(e)}, null, this
    )
    this.game.physics.arcade.overlap(
      this.game.arrows, this.game.enemies,
      (a, e) => {a.overlapEntity(e)}, null, this
    )
  },

  render() {
    if (this.game.debugBody) {
      this.game.enemies.filter(a => a.alive).list
        .concat(this.game.arrows.filter(a => a.alive).list)
        .concat([this.game.player])
        .forEach(e => this.game.debug.body(e))
    }
  }
}
