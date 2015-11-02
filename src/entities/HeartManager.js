import Heart from './Heart'

export default class HeartManager {
  constructor() {
    game.heartTrails = game.add.group()
    game.hearts = game.add.group()
    game.hearts.classType = Heart
    this.maxHearts = 16
    game.hearts.createMultiple(this.maxHearts)
  }
  getHeart(type) {
    let heart = game.hearts.getFirstDead() || game.hearts.filter(h => h.order == game.player.nextHeart).list[0]
    if (heart) {
      heart.order = game.player.nextHeart
      heart.recycle(type)
      let hearts = game.hearts.children.filter(c => c.alive)
      hearts.forEach((heart, index, hearts) => {
        heart.mAngle = (index*(360/hearts.length))/57
      })
    }
  }
}
