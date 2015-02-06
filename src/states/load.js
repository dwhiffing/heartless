module.exports = {
  constructor: function() {
    this.loadingSprite = null;
  },

  preload: function() {
    this.loadingSprite = this.add.sprite(320, 480, 'preloader');
    this.loadingSprite.anchor.setTo(0.5, 0.5);
    game.juicy = game.plugins.add(require('../Juicy.js'));
    game.joystick = game.plugins.add(require('../Joystick.js'));

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.loadingSprite);

    this.load.image('ground', 'images/ground.gif')
    this.load.image('sky', 'images/sky.gif')
    this.load.image('title', 'images/title.png')
    this.load.spritesheet('arrow', 'images/arrow.gif', 10, 5)
    this.load.spritesheet('skeleton', 'images/skeleton.gif', 32, 42)
    this.load.spritesheet('soldier', 'images/soldier.gif', 32, 42)
    this.load.spritesheet('helmet', 'images/helmet.gif', 32, 42 )
    this.load.spritesheet('bee', 'images/bee.gif', 32, 42)
    this.load.spritesheet('heart', 'images/heart.gif', 7,7)
    this.load.spritesheet('soul', 'images/pHeart.gif', 5,5)
    this.load.image('shadow', 'images/shadow.gif')
    this.load.spritesheet('player', 'images/player.gif', 32, 40)
    
    // this.load.sound('beat3', 'mp3/beat3.mp3')
    // this.load.sound('flatline', 'mp3/flatline.mp3')
    // this.load.sound('swarm', 'mp3/swarm.mp3')
    // this.load.sound('hurt3', 'mp3/hurt3.mp3')
    // this.load.sound('enemyJump', 'mp3/enemyJump.mp3')
    // this.load.sound('shoot', 'mp3/shoot.mp3')
    // this.load.sound('heart', 'mp3/heart.mp3')
    // this.load.sound('jump', 'mp3/jump.mp3')
    // this.load.sound('heal', 'mp3/heal.mp3')
    // this.load.sound('hurt', 'mp3/hurt.mp3')
    // this.load.sound('hit1', 'mp3/hit1.mp3')
    // this.load.sound('hit2', 'mp3/hit2.mp3')
    // this.load.sound('hit3', 'mp3/hit3.mp3')
    // this.load.sound('hit4', 'mp3/hit4.mp3')
    // this.load.sound('hit5', 'mp3/hit5.mp3')
    // this.load.sound('hit6', 'mp3/hit6.mp3')
    // this.load.sound('hit7', 'mp3/hit7.mp3')
    // this.load.sound('music', 'mp3/chippedLataren.mp3')
    // this.load.sound('instruct', 'mp3/instruction.mp3')
  },

  onLoadComplete: function() {
    game.state.start('play', true, false);
  }
}
