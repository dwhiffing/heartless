import helpers from'./helpers'

export default class Background {
  constructor(game) {
    this.game = game
    this.sky = game.add.tileSprite(0,0, game.width, game.height, "sky")
    this.sky.autoScroll(5,0)

    this.ground = game.add.tileSprite(0,0, game.width, game.height, "ground")
    this.ground.autoScroll(30,0)

    game.backGroup = game.add.group()
    game.backGroup.name = "backGroup"
    game.backGroup.add(this.sky)
    game.backGroup.add(this.ground)
  }
}
