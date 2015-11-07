export default class BlastGroup extends Phaser.Group {

  constructor(game) {
    super(game)
    this.game = game
    this.name = "BlastGroup"
  }

  create() {
    var blast = this.game.add.sprite(0, 0, 'explosion');
    blast.anchor.setTo(0.5, 0.5);
    this.add(blast);

    var animation = blast.animations.add('boom', [0,1,2,3], 60, false);
    animation.killOnComplete = true;

    return blast;
  }

  get(x, y, scale = 0.3, tint=0xffffff) {
    var blast = this.getFirstDead() || this.create();
    blast.reset(x, y);
    blast.tint = tint
    blast.scale.setTo(scale, scale)

    blast.angle = this.game.rnd.integerInRange(0, 360);
    blast.animations.play('boom');

    return blast;
  }
}
