import helpers from '../lib/helpers'

export default class InputManager {
  constructor(game) {
    this.game = game
    this.keys = game.input.keyboard.addKeys({
      up: Phaser.KeyCode.UP,
      down: Phaser.KeyCode.DOWN,
      left: Phaser.KeyCode.LEFT,
      right: Phaser.KeyCode.RIGHT,
      space: Phaser.KeyCode.SPACEBAR
    })
  }
  update() {
    if (this.keys.up.isDown) {
      this.game.player.move('y', -1)
    } else if (this.keys.down.isDown) {
      this.game.player.move('y', 1)
    }
    if (this.keys.left.isDown) {
      this.game.player.move('x', -1)
    } else if (this.keys.right.isDown) {
      this.game.player.move('x', 1)
    }
    if (this.keys.space.isDown) {
      this.game.player.jump()
    }
  }
}
