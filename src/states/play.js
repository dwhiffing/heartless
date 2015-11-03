import Player from '../entities/entity/Player'
import Arrow from '../entities/Arrow'
import Spawner from '../entities/Spawner'
import HeartManager from '../entities/HeartManager'
import BlastGroup from '../entities/BlastGroup'
import DisplayGroup from '../lib/DisplayGroup'
import helpers from '../lib/helpers'

export default {
  create() {
    Math.clamp = (a,b,c) => Math.max(b,Math.min(c,a))
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = 270
    game.score = 0
    game.halfHeight = game.height/2
    game.halfWidth = game.width/2

    this.keys = game.input.keyboard.addKeys({
      up: Phaser.KeyCode.UP,
      down: Phaser.KeyCode.DOWN,
      left: Phaser.KeyCode.LEFT,
      right: Phaser.KeyCode.RIGHT,
      space: Phaser.KeyCode.SPACEBAR
    })

    this.createBG()
    game.arrowGroup = game.add.group()
    game.arrowGroup.name = "arrowGroup"
    game.arrowGroup.classType = Arrow
    game.arrowGroup.createMultiple(100, 'arrow', 0)

    game.blasts = new BlastGroup();
    game.blasts.name = "BlastGroup"
    game.spawner = new Spawner()
    this.createGUI()
    game.heartManager = new HeartManager
    game.player = new Player(game.halfWidth-200, game.halfWidth/4)

    game.entityGroup = new DisplayGroup()
    game.entityGroup.name = "entityGroup"
    game.entityGroup.add(game.enemyGroup)
    game.entityGroup.add(game.player)
    // game.enableHeartTrails = true
    this.addDebug()
  },

  createBG() {
    this.sky = game.add.tileSprite(0,0, game.width, game.height, "sky")
    this.sky.autoScroll(5,0)

    this.ground = game.add.tileSprite(0,0, game.width, game.height, "ground")
    this.ground.autoScroll(30,0)

    game.backGroup = game.add.group()
    game.backGroup.name = "backGroup"
    game.backGroup.add(this.sky)
    game.backGroup.add(this.ground)
  },

  createGUI() {
    game.ui = {}
    game.textGroup = game.add.group()
    game.textGroup.name = "textGroup"
    let leftStrings = {
      score: 'score: 0',
      multi: 'multi: 0',
    }
    let rightStrings = {
      health: 'health: 100',
      highMulti: 'high multi: 0',
    }
    this.createDebugList(leftStrings, 10, 10, 0, 15)
    this.createDebugList(rightStrings, -80, 10, 0, 15)

    let startX = game.halfWidth/3

    let opts = {font: '7pt Arial'}
    let ratesText = helpers.addText(startX, 10,'rates:', opts)
    let heartsText = helpers.addText(startX, 20,'hearts:', opts)
    game.textGroup.add(ratesText)
    game.textGroup.add(heartsText)
    let rateStrings = {
      whiteRate: game.spawner.rates[0],
      redRate: game.spawner.rates[1],
      yellowRate: game.spawner.rates[2],
      blueRate: game.spawner.rates[3]
    }
    this.createDebugList(rateStrings, startX+35, 10, 20, 0, opts)

    let heartStrings = {
      whiteHeart: '0',
      redHeart: '0',
      yellowHeart: '0',
      blueHeart: '0'
    }
    this.createDebugList(heartStrings, startX+35, 20, 20, 0, opts)
  },

  createDebugList(list, x, y, spacingX, spacingY, opts={}) {
    Object.keys(list).forEach((key, index) => {
      game.ui[key+'Text'] = helpers.addText(
        x + index * spacingX,
        y + index * spacingY,
        list[key],
        opts
      )
      game.textGroup.add(game.ui[key+'Text'])
    })
  },

  update() {
    this.checkInput()
    this.updateEntities()
  },

  checkInput() {
    if (this.keys.up.isDown) {
      game.player.move('y', -1)
    } else if (this.keys.down.isDown) {
      game.player.move('y', 1)
    }
    if (this.keys.left.isDown) {
      game.player.move('x', -1)
    } else if (this.keys.right.isDown) {
      game.player.move('x', 1)
    }
    if (this.keys.space.isDown) {
      game.player.jump()
    }
  },

  updateEntities() {
    game.entityGroup.sort('z', Phaser.Group.SORT_ASCENDING)
    game.physics.arcade.overlap(
      game.player, game.enemyGroup,
      (player, enemy) => {player.overlapEntity(enemy)},
      null, this
    )
    game.physics.arcade.overlap(
      game.arrowGroup, game.enemyGroup,
      (arrow, enemy) => {arrow.overlapEntity(enemy)},
      null, this
    )
  },

  render() {
    // game.enemyGroup.filter(a => a.alive).list.forEach(e => {
    //   game.debug.body(e)
    // })
    // game.arrowGroup.filter(a => a.alive).list.forEach(e => {
    //   game.debug.body(e)
    // })
    // game.debug.body(game.player)
  },

  addDebug() {
    this.debugKeys = game.input.keyboard.addKeys({
      heartWhite: Phaser.KeyCode.ONE,
      heartRed: Phaser.KeyCode.TWO,
      heartYellow: Phaser.KeyCode.THREE,
      heartBlue: Phaser.KeyCode.FOUR,
      toggleEntityHitbox: Phaser.KeyCode.OPEN_BRACKET,
      toggleArrowHitbox: Phaser.KeyCode.CLOSE_BRACKET,
      decWhiteSpawn: Phaser.KeyCode.NINE,
      incWhiteSpawn: Phaser.KeyCode.ZERO,
      decRedSpawn: Phaser.KeyCode.O,
      incRedSpawn: Phaser.KeyCode.P,
      decYellowSpawn: Phaser.KeyCode.K,
      incYellowSpawn: Phaser.KeyCode.L,
      decBlueSpawn: Phaser.KeyCode.N,
      incBlueSpawn: Phaser.KeyCode.M,
      killAll: Phaser.KeyCode.BACKWARD_SLASH,
    })
    // debug keys
    const addHeartFn = (type) => {
      return () => {
        game.player.newHeart(type)
      }
    }
    const changeRateFn = (type, amount) => {
      return () => game.spawner.changeRate(type, amount)
    }
    this.debugKeys.heartWhite.onDown.add(addHeartFn(0))
    this.debugKeys.heartRed.onDown.add(addHeartFn(1))
    this.debugKeys.heartYellow.onDown.add(addHeartFn(2))
    this.debugKeys.heartBlue.onDown.add(addHeartFn(3))
    this.debugKeys.decWhiteSpawn.onDown.add(changeRateFn(0, -1))
    this.debugKeys.incWhiteSpawn.onDown.add(changeRateFn(0, 1))
    this.debugKeys.decRedSpawn.onDown.add(changeRateFn(1, -1))
    this.debugKeys.incRedSpawn.onDown.add(changeRateFn(1, 1))
    this.debugKeys.decYellowSpawn.onDown.add(changeRateFn(2, -1))
    this.debugKeys.incYellowSpawn.onDown.add(changeRateFn(2, 1))
    this.debugKeys.decBlueSpawn.onDown.add(changeRateFn(3, -1))
    this.debugKeys.incBlueSpawn.onDown.add(changeRateFn(3, 1))
    this.debugKeys.killAll.onDown.add(() => game.enemyGroup.callAll('kill'))
  }
}
