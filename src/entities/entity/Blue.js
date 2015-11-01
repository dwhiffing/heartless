import Enemy from './Enemy'

export default class Blue extends Enemy {
  constructor() {
    super(200, 200, 'helmet')

    this.heartType = 3
    this.numJumps = 2
    this.maxHealth = 50
    this.minSpeed = 25
    this.maxSpeed = 35
  }
}
