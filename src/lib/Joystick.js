var initialPoint

class Joystick extends Phaser.Plugin {
  constructor(game, parent) {
    super(this, game, parent)
    this.input = this.game.input

    this.imageGroup = []

    this.imageGroup.push(this.game.add.sprite(0, 0, 'compass'))
    this.imageGroup.push(this.game.add.sprite(0, 0, 'touch_segment'))
    this.imageGroup.push(this.game.add.sprite(0, 0, 'touch_segment'))
    this.imageGroup.push(this.game.add.sprite(0, 0, 'touch'))

    this.imageGroup.forEach(function (e) {
      e.anchor.set(0.5)
      e.visible=false
      e.fixedToCamera=true
    })
  }

  preUpdate() {}

  inputEnable() {
    this.input.onDown.add(createCompass, this)
    this.input.onUp.add(removeCompass, this)
  }

  inputDisable() {
    this.input.onDown.remove(createCompass, this)
    this.input.onUp.remove(removeCompass, this)
  }

  createCompass(){
    this.imageGroup.forEach(function (e) {
      e.visible = true
      e.bringToTop()
      e.cameraOffset.x = this.input.worldX
      e.cameraOffset.y = this.input.worldY
    }, this)

    this.preUpdate = setDirection.bind(this)
    initialPoint = this.input.activePointer.position.clone()
  }

  removeCompass () {
    this.imageGroup.forEach(function(e){
      e.visible = false
    })

    this.cursors.up = false
    this.cursors.down = false
    this.cursors.left = false
    this.cursors.right = false

    this.speed.x = 0
    this.speed.y = 0

    this.preUpdate = () => {}
  }

  setDirection() {
    var d = initialPoint.distance(this.input.activePointer.position)
    var maxDistanceInPixels = this.settings.maxDistanceInPixels

    var deltaX = this.input.activePointer.position.x - initialPoint.x
    var deltaY = this.input.activePointer.position.y - initialPoint.y

    if (this.settings.singleDirection){
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        deltaY = 0
        this.input.activePointer.position.y = initialPoint.y
      } else {
        deltaX = 0
        this.input.activePointer.position.x = initialPoint.x
      }
    }
    var angle = initialPoint.angle(this.input.activePointer.position)

    if (d > maxDistanceInPixels) {
      deltaX = Math.cos(angle) * maxDistanceInPixels
      deltaY = Math.sin(angle) * maxDistanceInPixels
    }

    this.speed.x = parseInt((deltaX/maxDistanceInPixels) * 100 * -1, 10)
    this.speed.y = parseInt((deltaY/maxDistanceInPixels) * 100 * -1, 10)

    this.cursors.up = (deltaY < 0)
    this.cursors.down = (deltaY > 0)
    this.cursors.left = (deltaX < 0)
    this.cursors.right = (deltaX > 0)

    this.imageGroup.forEach(function(e,i){
      e.cameraOffset.x = initialPoint.x+(deltaX)*i/3
      e.cameraOffset.y = initialPoint.y+(deltaY)*i/3
    }, this)
  }
}

Joystick.settings = {
  maxDistanceInPixels: 200,
  singleDirection: false
}

Joystick.cursors = {
  up: false, down: false, left: false, right: false
}

Joystick.speed = {
  x:0, y:0
}

export default Joystick
