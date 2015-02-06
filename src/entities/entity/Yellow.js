var Enemy = require('./Enemy.js');

var Yellow = function() {
  this.name = "Enemy";
  this.heartType = 2;
  Enemy.call(this, 200, 200, "bee");
  this.numJumps = 1;   
  this.maxHealth =10;
  this.minSpeed = 115;
  this.maxSpeed = 125;
}

Yellow.prototype = Object.create(Enemy.prototype)
Yellow.prototype.constructor = Yellow;

module.exports = Yellow
