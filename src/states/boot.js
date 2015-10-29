module.exports = {

  preload: function () {
    this.load.baseURL = 'src/assets/';
    // this.load.image('preloader', 'images/preloader.gif');
    game.time.advancedTiming = true;
  },

  create: function () {
    this.input.maxPointers = 2;

    // auto pause if window loses focus
    this.stage.disableVisibilityChange = true;

    // set up scale mode
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    game.scale.setScreenSize(true);
    this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
    this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);

    // double the world scale since assets are at 1/2 size
    game.world.scale.setTo(2,2)
    // disable antialiasing on scale to maintain pixel look
    game.stage.smoothed = false;

    game.state.start('load', true, false);
  },

  enterIncorrectOrientation: function () {
    game.orientated = false;
    document.getElementById('orientation').style.display = 'block';
  },

  leaveIncorrectOrientation: function () {
    game.orientated = true;
    document.getElementById('orientation').style.display = 'none';
  }
};
