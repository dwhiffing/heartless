var Enemy = require('./Enemy.js');

var Blue = function() {
  this.name = "Enemy";
  this.heartType = 3;
  Enemy.call(this, 200, 200, "helmet");
  this.numJumps = 2;   
  this.maxHealth =50;
  this.minSpeed = 25;
  this.maxSpeed = 35;
}

Blue.prototype = Object.create(Enemy.prototype)
Blue.prototype.constructor = Blue;

module.exports = Blue
