import Enemy from './Enemy'

export default class Red extends Enemy {
  constructor(game) {
    super(game, 200, 200, 'soldier')

    this.heartType = 1
    this.numJumps = 1
    this.maxHealth = 20
    this.minSpeed = 60
    this.maxSpeed = 100
  }
}
