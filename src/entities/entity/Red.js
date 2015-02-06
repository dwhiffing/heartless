var Enemy = require('./Enemy.js');

var Red = function() {
  this.name = "Enemy";
  this.heartType = 1;
  Enemy.call(this, 200, 200, "soldier");
  this.numJumps = 1;   
  this.maxHealth =20;
  this.minSpeed = 35;
  this.maxSpeed = 85;
}

Red.prototype = Object.create(Enemy.prototype)
Red.prototype.constructor = Red;

module.exports = Red
