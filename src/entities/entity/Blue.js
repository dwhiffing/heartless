import Enemy from './Enemy'

export default class Blue extends Enemy {
  constructor() {
    super(200, 200, 'helmet')

    this.heartType = 3
    this.numJumps = 2
    this.maxHealth = 30
    this.minSpeed = 5
    this.maxSpeed = 45
  }
}
