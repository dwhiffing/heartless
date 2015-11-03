export default {

  preload() {
    game.time.advancedTiming = true
  },

  create() {
    // set up scale mode
    game.scale.scaleMode = Phaser.ScaleManager.NONE
    // this.scale.pageAlignHorizontally = true
    // this.scale.pageAlignVertically = true

    // double the world scale since assets are at 1/2 size
    game.world.scale.setTo(2,2)

    // disable antialiasing on scale to maintain pixel look
    game.stage.smoothed = false

    game.state.start('load', true, false)
  }
}
