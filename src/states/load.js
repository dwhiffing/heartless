import Juicy from '../lib/Juicy'
import debugPlugin from 'phaser-debug'
export default {
  preload() {
    this.game.juicy = this.game.plugins.add(Juicy)
    // this.game.add.plugin(Phaser.Plugin.Inspector);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('ground', 'images/ground.gif')
    this.load.image('sky', 'images/sky.png')
    this.load.image('moon', 'images/moon.png')
    this.load.image('title', 'images/title.png')

    this.load.spritesheet('arrow', 'images/arrow.png', 10, 5)
    this.load.spritesheet('heart', 'images/heart.png', 7,7)
    this.load.spritesheet('soul', 'images/pHeart.gif', 5,5)
    this.load.image('shadow', 'images/shadow.gif')
    this.game.load.spritesheet('explosion', 'images/explosion.png', 128, 128);
    this.game.load.spritesheet('mute', 'images/mute.png', 16, 20);

    this.load.spritesheet('player', 'images/player.png', 32, 40)
    this.load.spritesheet('enemy', 'images/enemy.png', 32, 50)

    this.load.audio('chippedLataren','sound/chippedLataren.mp3')

    this.load.audio('beat2','sound/beat2.mp3')
    this.load.audio('beat2','sound/beat2.wav')
    this.load.audio('beat3','sound/beat3.mp3')
    this.load.audio('enemyJump','sound/enemyJump.mp3')
    this.load.audio('flatline','sound/flatline.mp3')
    this.load.audio('heal','sound/heal.mp3')
    this.load.audio('heart','sound/heart.mp3')
    this.load.audio('heart3','sound/heart3.mp3')
    this.load.audio('hit1','sound/hit1.mp3')
    this.load.audio('hit2','sound/hit2.mp3')
    this.load.audio('hit3','sound/hit3.mp3')
    this.load.audio('hit4','sound/hit4.mp3')
    this.load.audio('hit5','sound/hit5.mp3')
    this.load.audio('hit6','sound/hit6.mp3')
    this.load.audio('hit7','sound/hit7.mp3')
    this.load.audio('hurt','sound/hurt.mp3')
    this.load.audio('hurt2','sound/hurt2.mp3')
    this.load.audio('hurt3','sound/hurt3.mp3')
    this.load.audio('instruction','sound/instruction.mp3')
    this.load.audio('instruction2','sound/instruction2.mp3')
    this.load.audio('jump','sound/jump.mp3')
    this.load.audio('shoot','sound/shoot.mp3')
    this.load.audio('shoot2','sound/shoot2.mp3')
    this.load.audio('swarm','sound/swarm.mp3')
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
