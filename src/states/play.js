import Player from '../entities/entity/Player'
import Arrow from '../entities/Arrow'
import Spawner from '../entities/Spawner'
import HeartManager from '../entities/HeartManager'
import DisplayGroup from '../lib/DisplayGroup'

export default {
  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = 550
    game.score = 0
    game.halfHeight = game.height/2
    game.halfWidth = game.width/2

    this.cursors = game.input.keyboard.createCursorKeys()
    this.space = game.input.keyboard.addKey(
      Phaser.Keyboard.SPACEBAR
    )

    this.createBG()
    this.createEntities()
    // this.createGUI()

    // game.enableHeartTrails = true
    game.heartManager = new HeartManager

    // add some hearts for debugging
    for (var i = 0; i< 3; i++) {
      game.heartManager.getHeart(1)
      game.heartManager.getHeart(2)
      game.heartManager.getHeart(3)
    }
  },

  createBG() {
    this.sky = game.add.tileSprite(0,0, game.width, game.height, "sky")
    this.sky.autoScroll(5,0)

    this.ground = game.add.tileSprite(0,0, game.width, game.height, "ground")
    this.ground.autoScroll(30,0)

    game.backGroup = game.add.group()
    game.backGroup.add(this.sky)
    game.backGroup.add(this.ground)
  },

  createEntities() {
    game.arrowGroup = game.add.group()
    game.arrowGroup.classType = Arrow
    game.arrowGroup.createMultiple(100, 'arrow', 0)

    game.spawner = new Spawner()
    game.player = new Player(game.halfWidth-200, game.halfWidth/4)

    game.entityGroup = new DisplayGroup()
    game.entityGroup.add(game.enemyGroup)
    game.entityGroup.add(game.player)
  },

  createGUI() {
    game.gui.classType = Phaser.Text
    game.gui = game.add.group()
    game.pointGroup = game.add.group()

    game.instruct = new Instructions()

    this.title = game.gui.create(10, 15, 'title')
    this.sub = game.gui.create(0, 35, 'sub1')
    this.bars = game.gui.create(0, 0, 'bars')
    this.scoreTxt = game.gui.create(150, 5, "")
    this.finalScoreTxt = game.gui.crate(100, 125, "")
  },

  update() {
    this.checkInput()
    this.updateEntities()
    // this.updateGUI()
  },

  checkInput() {
    if (this.cursors.up.isDown) {
      game.player.move('y', -1)
    }
    else if (this.cursors.down.isDown) {
      game.player.move('y', 1)
    }
    if (this.cursors.left.isDown) {
      game.player.move('x', -1)
    }
    else if (this.cursors.right.isDown) {
      game.player.move('x', 1)
    }
    if (this.space.isDown) {
      game.player.tryJump()
    }
  },

  updateEntities() {
    game.entityGroup.sort('z', Phaser.Group.SORT_ASCENDING)
    game.physics.arcade.overlap(
      game.player, game.enemyGroup,
      (player, enemy) => {player.hit(enemy)},
      null, this
    )
    game.physics.arcade.overlap(
      game.arrowGroup, game.enemyGroup,
      (arrow, enemy) => {arrow.hit(enemy)},
      null, this
    )
  },

  updateGUI() {
    scoreTxt.text = game.score.toString()
    var pnt = pointTxt(game.pointGroup.getFirstAvailable(pointTxt))
    pnt.recycle(_enemy.x + 20, _enemy.y)
    pnt.text = int((_score * multi))
      .toString()
    score += int((_score * multi))
    if (jumping) multi += 0.25
    if (multi > bestMulti) bestMulti = multi
  },

  render() {
    // game.debug.body(game.player)
  }
}
