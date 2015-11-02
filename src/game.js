import BootState from './states/boot'
import LoadState from './states/load'
import PlayState from './states/play'

window.game = new Phaser.Game(
  800, // widths
  450, // height
  Phaser.AUTO, // renderer: AUTO, CANVAS, WEBGL, or HEADLESS
  'game-container', // element to mount canvas to
  BootState, // initial state
  false, // transparent bg
  false // anti-alias
)

game.state.add('load', LoadState)
game.state.add('play', PlayState)
