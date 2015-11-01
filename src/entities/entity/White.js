import Enemy from './Enemy'

export default class White extends Enemy {
  constructor() {
    super(200, 200, 'skeleton')

    this.heartType = 0
    this.numJumps = 1
    this.maxHealth = 10
    this.minSpeed = 45
    this.maxSpeed = 95
  }
}
