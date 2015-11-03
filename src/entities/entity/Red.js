import Enemy from './Enemy'

export default class Red extends Enemy {
  constructor() {
    super(200, 200, 'soldier')

    this.heartType = 1
    this.numJumps = 1
    this.maxHealth = 20
    this.minSpeed = 50
    this.maxSpeed = 120
  }
}
