import Juicy from '../lib/Juicy'

export default {
  preload() {
    game.juicy = game.plugins.add(Juicy)

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('ground', 'images/ground.gif')
    this.load.image('sky', 'images/sky.gif')
    this.load.image('title', 'images/title.png')

    this.load.spritesheet('arrow', 'images/arrow.gif', 10, 5)
    this.load.spritesheet('heart', 'images/heart.gif', 7,7)
    this.load.spritesheet('soul', 'images/pHeart.gif', 5,5)
    this.load.image('shadow', 'images/shadow.gif')

    this.load.spritesheet('player', 'images/player.gif', 32, 40)

    this.load.spritesheet('skeleton', 'images/skeleton.gif', 32, 42)
    this.load.spritesheet('soldier', 'images/soldier.gif', 32, 42)
    this.load.spritesheet('helmet', 'images/helmet.gif', 32, 42 )
    this.load.spritesheet('bee', 'images/bee.gif', 32, 42)
  },

  onLoadComplete() {
    game.state.start('play', true, false)
  }
}
