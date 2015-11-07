import Heart from './Heart'

export default class HeartGroup extends Phaser.Group {

  constructor(game) {
    super(game)
    this.game = game
    this.name = "HeartGroup"
    this.classType = Heart
    this.maxHearts = 16
    this.createMultiple(this.maxHearts)

    game.heartTrails = game.add.group()
    game.heartTrails.name = "heartTrails"
  }

  countLiving() {
    return this.filter(c => c.alive).list.length
  }

  get(type) {
    let heart = this.game.hearts.getFirstDead() || this.game.hearts.filter(h => h.order == this.game.player.nextHeart).list[0]
    if (heart) {
      heart.order = this.game.player.nextHeart
      heart.reset(type)
      let hearts = this.game.hearts.children.filter(c => c.alive)
      hearts.forEach((heart, index, hearts) => {
        heart.mAngle = (index*(360/hearts.length))/57
      })
    }

    return heart
  }
}
