import helpers from'./helpers'

export default class Background {
  constructor(game) {
    this.game = game
    this.sky = game.add.tileSprite(0,0, game.width, game.height, "sky")
    this.sky.autoScroll(5,0)
    this.ground = game.add.tileSprite(0,0, game.width, game.height, "ground")
    this.moon = game.add.sprite(0,0,"moon")
    this.ground.autoScroll(30,0)
    this.moon.tint = 0x550000
    game.backGroup = game.add.group()
    game.backGroup.name = "backGroup"
    game.backGroup.add(this.sky)
    game.backGroup.add(this.moon)
    game.backGroup.add(this.ground)
  }
  update() {
    // this.moon.x += 0.2
  }
}
