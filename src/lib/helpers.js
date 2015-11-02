export default {
  keepInBounds(entity) {
    if (entity.y < game.halfHeight/2) {
      entity.y = game.halfHeight/2
    } else if (entity.y > game.halfHeight){
      entity.y = game.halfHeight
    }
    if (entity.x < 50) {
      entity.x = 50
    } else if (entity.x > game.halfWidth-50){
      entity.x = game.halfWidth-50
    }
  },

  typeToSting(type) {
    let words = ['white', 'red', 'yellow', 'blue', 'purple', 'green', 'orange']
    return words[type]
  },

  typeToHex(type) {
    let words = [0xffffff, 0xff0000, 0xffff00, 0x0000ff, 0xff00ff, 0x00ff00, 0xffaa00]
    return words[type]
  },

  delay(time, fn) {
    game.time.events.add(time, fn)
  },

  flickerSprite(sprite, time=1500, flicker, callback) {
    flicker = flicker || function() {
      this.alpha = (this.alpha === 0.5) ? 0.8 : 0.5
    }

    if (!sprite.flicker) {
      sprite.flicker = game.time.create(false)
      sprite.flicker.loop(time/6, flicker, sprite)
      sprite.flicker.start()
      sprite.flicker.pause()
    }

    sprite.flicker.resume()

    game.time.events.add(time, () => {
      sprite.invulnerable = false
      sprite.flicker.pause()
      sprite.animations.play("walk")
      sprite.alpha = 1
      if (callback) {
        callback()
      }
    }, sprite)
  },
  addText(x, y, string, opts) {
    if (x < 0) {
      x = game.halfWidth+x
    }
    if (y < 0) {
      y = game.halfHeight+y
    }
    opts = opts || {}
    opts = Object.assign({font: '9pt Arial', fill: '#ffffff'}, opts)

    let text = game.add.text(x, y, string, opts)
    if (opts.anchorX && opts.anchorY) {
      text.anchor.setTo(opts.anchorX, opts.anchorY)
    }
    return text
  }
}
