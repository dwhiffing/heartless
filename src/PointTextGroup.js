export default class PointTextGroup extends Phaser.Group {

  constructor(game) {
    super(game)
    this.game = game
    this.name = "PointTextGroup"
    this.classType = Phaser.Text
  }

  make() {

    var text  =this.create(-100,-100, "",  {font: '9pt Arial', fill: "#ffffff"});
    this.game.physics.enable(text)
    text.body.allowGravity = false
    return text
  }

  get(x, y, val) {
    var text = this.getFirstDead() || this.make();
    text.reset(x, y)
    text.body.velocity.y=-50
    text.lifespan=750
    text.text = val
    return text;
  }
}
