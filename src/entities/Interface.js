import helpers from '../lib/helpers'

export default class Interface {
  constructor(game) {
    this.game = game
    game.score = 0
    game.multi = 1
    game.highMulti = 1
    this.createGUI()
    this.addDebug()

    game.updateScore = (change=0, sourceX, sourceY) => {
      let scoreChange = change * game.multi
      let x = sourceX ? sourceX : game.player.x
      let y = sourceY ? sourceY : game.player.y
      game.score += scoreChange
      game.ui.scoreText.text = game.score
      this.game.pointTexts.get(x, y, scoreChange.toString())
    }

    game.updateMulti = (change) => {
      if (change === 0) {
        game.multi = 1
      } else {
        game.multi += change
      }
      game.ui.multiText.text = game.multi
      if (game.multi > game.highMulti) {
        game.highMulti = game.multi
        game.ui.highMultiText.text = game.highMulti
      }
    }
  }

  createGUI() {
    this.game.ui = {}
    this.game.textGroup = this.game.add.group()
    this.game.textGroup.name = "textGroup"
    this.createDebugList({
      scoreLabel: 'score:',
      score: '0'
    }, 10, 10, 35, 0)
    this.createDebugList({
      multiLabel: 'multi:',
      multi: '1'
    }, 10, 30, 35, 0)
    this.createDebugList({
      healthLabel: 'health:',
      health: '100'
    }, -80, 10, 40, 0)
    this.createDebugList({
      highMultiLabel: 'best:',
      highMulti: '1'
    }, -80, 30, 40, 0)

    let startX = this.game.width/6

    let opts = {font: '7pt Arial'}
    let ratesText = helpers.addText(this.game, startX, 10,'rates:', opts)
    let heartsText = helpers.addText(this.game, startX, 20,'hearts:', opts)
    this.game.textGroup.add(ratesText)
    this.game.textGroup.add(heartsText)
    let ratestrings = {
      whiteRate: '1',
      redRate: '1',
      yellowRate: '1',
      blueRate: '1'
    }
    this.createDebugList(ratestrings, startX+35, 10, 20, 0, opts)

    let heartStrings = {
      whiteHeart: '0',
      redHeart: '0',
      yellowHeart: '0',
      blueHeart: '0'
    }
    this.createDebugList(heartStrings, startX+35, 20, 20, 0, opts)
  }

  createDebugList(list, x, y, spacingX, spacingY, opts={}) {
    Object.keys(list).forEach((key, index) => {
      this.game.ui[key+'Text'] = helpers.addText(this.game,
        x + index * spacingX,
        y + index * spacingY,
        list[key],
        opts
      )
      this.game.textGroup.add(this.game.ui[key+'Text'])
    })
  }

  addDebug() {
    this.debugKeys = this.game.input.keyboard.addKeys({
      heartWhite: Phaser.KeyCode.ONE,
      heartRed: Phaser.KeyCode.TWO,
      heartYellow: Phaser.KeyCode.THREE,
      heartBlue: Phaser.KeyCode.FOUR,
      toggleDebugBody: Phaser.KeyCode.OPEN_BRACKET,
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
    const addHeartFn = (type) => () => this.game.player.newHeart(type)
    const changeRateFn = (type, amount) => {
      return () => this.game.enemyManager.changeRate(type, amount)
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
    this.debugKeys.killAll.onDown.add(() => this.game.enemies.callAll('kill'))
    this.debugKeys.toggleDebugBody.onDown.add(() => {
      this.game.debug.reset()
      this.game.debugBody = !this.game.debugBody
    })
  }
}
