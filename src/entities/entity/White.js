var Enemy = require('./Enemy.js');

var White = function() {
  this.name = "Enemy";
  this.heartType = 0;
  Enemy.call(this, 200, 200, "skeleton");
  this.numJumps = 1;   
  this.maxHealth =10;
  this.minSpeed = 45;
  this.maxSpeed = 95;
}

White.prototype = Object.create(Enemy.prototype)
White.prototype.constructor = White;

module.exports = White
