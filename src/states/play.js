import Player from '../Player'
import EnemyManager from '../EnemyManager'
import HeartGroup from '../HeartGroup'
import InputManager from '../InputManager'
import Background from '../Background'
import Interface from '../Interface'
import BlastGroup from '../BlastGroup'
import PointTextGroup from '../PointTextGroup'
import DisplayGroup from '../lib/DisplayGroup'
import helpers from'../helpers'

export default {
  create(game) {
    Math.clamp = (a,b,c) => Math.max(b,Math.min(c,a))

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = 270

    game.backgroundManager = new Background(game)
    game.inputManager = new InputManager(game)
    game.blasts = new BlastGroup(game)
    game.interface = new Interface(game)
    game.hearts = new HeartGroup(game)
    game.heartTrails = game.add.group()
    game.heartTrails.name = "heartTrails"
    game.player = new Player(game, game.width/2-200, game.width/8)
    game.enemyManager = new EnemyManager(game)
    game.pointTexts = new PointTextGroup(game)

    game.entityGroup = new DisplayGroup(game, 'entityGroup',[game.enemies, game.player])

    game.interface.mute()

    game.music = game.add.audio("chippedLataren")

    // game.enableHeartTrails = true
    game.debugBody = false
  },

  update() {
    this.game.backgroundManager.update()
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
