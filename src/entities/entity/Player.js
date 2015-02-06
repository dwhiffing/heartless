var lastHeart, multi, bestMulti, numHearts, cursors, soul, space, buffer;
var Entity = require('./Entity.js');
var Bow = require('../Bow.js');
var Heart = require('../Heart.js');

// the Player is defined as a Phaser.Sprite
var Player = function(x, y) {
  Entity.call(this, x, y, "player");
  this.name = "Player";
  this.body.height = 30;

  // extra offset is required here to center soul onto entity
  // soul is added as a child of player because
  // we always want it to match the player position
  soul = game.add.sprite(2, -16, "soul")
  soul.animations.add('life', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,])
  soul.animations.play('life', 0)
  this.addChild(soul)

   // shadow anchor is defined as its absolute center
  // shadow is not added as a child of the Entity as we need to control it separately
  this.shadow = game.add.sprite(x, y, "shadow")
  this.shadow.anchor.setTo(0.5, 0.5)
  game.physics.enable(this.shadow)
  this.shadow.body.allowGravity = false;
  this.shadow.body.maxVelocity.set(this.runSpeed, this.runSpeed/2.2);
  this.shadow.body.drag.set(550);
  game.backGroup.add(this.shadow);

  // create a collection of animations based on the frames in our spritesheet,
  // play at 2 frames per second and loop
  this.animations.add('walk', [0, 1], 2, true)
  this.animations.add('jump', [2], 2, true)
  this.animations.add('hurt', [3], 2, true)
  this.animations.add('heal', [4], 2, true)
  this.animations.add('still', [0], 2, true)
  this.animations.play('walk')

  // create a Bow to track player weapon stats
  this.bow = new Bow(this);
  
  // initialize various vars the player will need for basic operation
  this.jumpHeight = 500;
  this.health = this.maxHealth = 100;
  lastHeart = 0;
  this.numHearts = 0;
  buffer = 50;
  multi = bestMulti = 1;

  this.heartCounts = [0,0,0,0];

  game.trailGroup = game.add.group();
  game.heartGroup = game.add.group();
  game.heartGroup.classType = Heart;
  game.heartGroup.createMultiple(15);

  cursors = game.input.keyboard.createCursorKeys();
  space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  this.invulnerableTime = 1500;

  this.flicker = game.time.create(false);
  this.flicker.loop(this.invulnerableTime/6, function(){
    this.alpha = (this.alpha === 0.5) ? 0.8 : 0.5;
  }, this)
  this.flicker.start();
  this.flicker.pause();
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.preUpdate = function() {
  if (this.jumping){
    // keep from jumping too far past shadow
    if(this.y < this.shadow.y-100) {
      this.y = this.shadow.y-100
    }
    // land if fallen past shadow and moving downwards
    if(this.y > this.shadow.y && this.body.velocity.y > 0) {
      this.land();
    }
  }
  Phaser.Sprite.prototype.preUpdate.call(this)
}


Player.prototype.update = function() {
  this.inputLogic();
  this.keepInBounds();
  
  // shadow is used to track 'z' position while jumping
  this.z = this.shadow.y;
  this.x = this.shadow.x || this.x;
  if (!this.jumping) this.y = this.shadow.y;

  Entity.prototype.update.call(this);
}


Player.prototype.inputLogic = function() {
  if (cursors.up.isDown) {
    this.move('y', -this.runSpeed)
  }
  else if (cursors.down.isDown) {
    this.move('y', this.runSpeed)
  }
  if (cursors.left.isDown) {
    this.move('x', -this.runSpeed)
  }
  else if (cursors.right.isDown) {
    this.move('x', this.runSpeed)
  }

  if (space.isDown) {
    if (!this.jumping){
      this.jump();
      this.heal(this.numHearts*4);
    } 
  }
}

Player.prototype.keepInBounds = function() {
  if (this.shadow.y < game.trueHeight/2) {
    this.shadow.y = game.trueHeight/2;
  }
  else if (this.shadow.y > game.trueHeight){
    this.shadow.y = game.trueHeight;
  }
  if (this.shadow.x < buffer) {
    this.shadow.x = buffer;
  }
  else if (this.shadow.x > game.trueWidth-buffer){
    this.shadow.x = game.trueWidth-buffer;
  }
}

Player.prototype.heal = function(healAmount) {
  if (healAmount <= 0) return;
  this.resetCombo();
  // FlxG.play(healWAV, 0.5);
  this.health += Math.ceil(healAmount);
  if (this.health > 100) {
    this.health = 100;
  }
  this.tint = 0x00ff00;
  game.time.events.add(500, function(){
    this.tint = 0xffffff;
  }, this)
}

Player.prototype.resetCombo = function() {
  lastHeart = 0;
  this.numHearts = 0;
  this.bow.resetStats();
  this.heartCounts = [0,0,0,0]
  game.heartGroup.callAllExists("fly", true);
}

Player.prototype.hit = function(_enemy) { //landed on enemy
  if (_enemy.y < this.shadow.y + 15 && _enemy.y > this.shadow.y - 15 && this.body.velocity.y > 0) {
    if (this.jumping && !_enemy.jumping) {
      this.jump(_enemy);
      _enemy.damage(_enemy.jumpDamage);
      this.changeBow(_enemy.heartType);
    }
  }
  if ((!this.jumping && !_enemy.jumping) || (this.jumping && _enemy.jumping)) {
    this.damage(_enemy.damage)
  }
}

Player.prototype.changeBow = function(type) {
  //FlxG.play(heartWAV, 0.3);
  this.numHearts++;
  var heart = game.heartGroup.getFirstDead();
  heart.recycle(type);
  var i = 0;
  game.heartGroup.forEachAlive(function(heart) {
    heart.mAngle = (i*(360/this.numHearts))/57; i++;
  }, this)
  
  this.heartCounts[type]++;
  // this.bow.updateStats(this.heartCounts)
}

Player.prototype.damage = function(damage) {
  if (this.invulnerable) return
  game.juicy.shake(20,100);
  this.triggerInvulnerablity();
  Entity.prototype.damage.call(this, damage);
  soul.animations.frame = Math.ceil(this.health/(this.maxHealth/15));
}

Player.prototype.triggerInvulnerablity = function() {
  this.invulnerable = true;
  this.flicker.resume();
  game.time.events.add(this.invulnerableTime, this.endInvulnerablity, this).start
}

Player.prototype.endInvulnerablity = function() {
  this.invulnerable = false;
  this.flicker.pause();
  this.animations.play("walk"); 
  this.alpha = 1;
}

Player.prototype.move = function(dir, speed) {
  // the player moves via his shadow
  this.shadow.body.velocity[dir] = speed;
}

Player.prototype.shoot = function() {
  // the player can only shoot while walking
  if (!this.jumping){
    Entity.prototype.shoot.call(this);
  }
}

Player.prototype.jump = function(_enemy) {
  Entity.prototype.jump.call(this);
}

Player.prototype.reset = function(x, y, v) {
  this.shadow.reset(x, y);
  Entity.prototype.reset.call(this, x, y)
}

module.exports = Player