var Player = require('../entities/entity/Player.js');
var Arrow = require('../entities/Arrow.js');
var Spawner = require('../entities/Spawner.js');
var Joystick = require('../Joystick.js');
var DisplayGroup = require('../lib/DisplayGroup.js');

var title, ground, sky;

module.exports = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 550;
    game.score = 0;
    game.musicPlaying = false;
    game.gameStarted = true;
    game.trueHeight = game.height/2;
    game.trueWidth = game.width/2;
    // game.enableHeartTrails = true
    
    this.createBG();
    this.createEntities();
    // createGUI();
    this.game.joystick = this.game.plugins.add(Joystick);
    this.game.joystick.inputEnable();
  },
  
  createBG: function() {
    game.backGroup = game.add.group();
    sky = game.add.tileSprite(0,0, game.width, game.height, "sky");
    ground = game.add.tileSprite(0,0, game.width, game.height, "ground");
    ground.autoScroll(30,0);
    sky.autoScroll(5,0);
    game.backGroup.add(sky);
    game.backGroup.add(ground);
  },

  createEntities: function() {
    game.arrowGroup = game.add.group();
    game.arrowGroup.classType = Arrow;
    game.arrowGroup.createMultiple(100, 'arrow', 0)

    game.spawner = new Spawner();
    game.player = new Player(game.trueWidth-200, game.trueHeight/4);
    
    game.entityGroup = new DisplayGroup();
    game.entityGroup.add(game.enemyGroup);
    game.entityGroup.add(game.player);

    // add some hearts for debugging
    // for (var i = 0; i< 3; i++){game.player.changeBow(1);game.player.changeBow(2); game.player.changeBow(3);}
  },

  updateScore: function(_x, _y, _score, _enemy) {
    var pnt = pointTxt(game.pointGroup.getFirstAvailable(pointTxt));
    pnt.recycle(_enemy.x + 20, _enemy.y);
    pnt.text = int((_score * multi))
      .toString();
    score += int((_score * multi));
    if (jumping) multi += 0.25;
    if (multi > bestMulti) bestMulti = multi;
  },
  
  createGUI: function() {
    game.gui.classType = Phaser.Text;
    game.gui = game.add.group();
    game.pointGroup = game.add.group();

    game.instruct = new Instructions();

    title = game.gui.create(10, 15, 'title')
    sub = game.gui.create(0, 35, 'sub1')
    bars = game.gui.create(0, 0, 'bars')
    scoreTxt = game.gui.create(150, 5, "");
    finalScoreTxt = game.gui.crate(100, 125, "");
  },

  update: function() {
    game.physics.arcade.overlap(game.player, game.enemyGroup, this.collidePlayer, null, this);
    game.physics.arcade.overlap(game.arrowGroup, game.enemyGroup, this.collideArrows, null, this);
    game.entityGroup.sort('z', Phaser.Group.SORT_ASCENDING);
  },

  collidePlayer: function(player, enemy) { //player and enemy collisions
    player.hit(enemy); 
  },

  collideArrows: function(arrow, enemy) { //player and enemy collisions
    arrow.hit(enemy);
  },
  
  updateGUI: function() {
    scoreTxt.text = Reg.player.score.toString();
  },
  
  render: function() {
    // game.debug.body(game.player);
  }
}
