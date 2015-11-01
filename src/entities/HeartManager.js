import Heart from './Heart'

export default class HeartManager {
  constructor() {
    game.trailGroup = game.add.group()
    game.heartGroup = game.add.group()
    game.heartGroup.classType = Heart
    game.heartGroup.createMultiple(15)
  }
  getHeart(type) {
    var heart = game.heartGroup.getFirstDead()
    heart.recycle(type)
    game.heartGroup.children.filter(c => c.alive)
      .forEach((heart, index, hearts) => {
        heart.mAngle = (index*(360/hearts.length))/57
      })
  }
}
