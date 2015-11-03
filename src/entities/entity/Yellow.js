import Enemy from './Enemy'

export default class Yellow extends Enemy {
  constructor() {
    super(200, 200, 'bee')

    this.heartType = 2
    this.numJumps = 1
    this.maxHealth = 10
    this.minSpeed = 135
    this.maxSpeed = 305
  }
}
