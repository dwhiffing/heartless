export default {
  keepInBounds(entity) {
    if (entity.y < game.halfHeight/2) {
      entity.y = game.halfHeight/2
    } else if (entity.y > game.halfHeight){
      entity.y = game.halfHeight
    }
    if (entity.x < this.buffer) {
      entity.x = this.buffer
    } else if (entity.x > game.halfWidth-this.buffer){
      entity.x = game.halfWidth-this.buffer
    }
  },

  flickerSprite(sprite, time=1500) {
    if (!sprite.flicker) {
      sprite.flicker = game.time.create(false)
      sprite.flicker.loop(time/6, function(){
        this.alpha = (this.alpha === 0.5) ? 0.8 : 0.5
      }, sprite)
      sprite.flicker.start()
      sprite.flicker.pause()
    }

    sprite.flicker.resume()

    game.time.events.add(time, () => {
      sprite.invulnerable = false
      sprite.flicker.pause()
      sprite.animations.play("walk")
      sprite.alpha = 1
    }, sprite)
  }
}
