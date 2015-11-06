import Heart from './Heart'

export default class HeartGroup {
  constructor(game) {
    this.game = game
    game.heartTrails = game.add.group()
    game.hearts = game.add.group()
    game.hearts.name = "heartGroup"
    game.heartTrails.name = "heartTrails"
    game.hearts.classType = Heart
    this.maxHearts = 16
    game.hearts.createMultiple(this.maxHearts)
  }
  getHeart(type) {
    let heart = this.game.hearts.getFirstDead() || this.game.hearts.filter(h => h.order == this.game.player.nextHeart).list[0]
    if (heart) {
      heart.order = this.game.player.nextHeart
      heart.reset(type)
      let hearts = this.game.hearts.children.filter(c => c.alive)
      hearts.forEach((heart, index, hearts) => {
        heart.mAngle = (index*(360/hearts.length))/57
      })
    }
  }
}
