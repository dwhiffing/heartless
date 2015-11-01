import BootState from './states/boot'
import LoadState from './states/load'
import PlayState from './states/play'

window.game = new Phaser.Game(800, 450, Phaser.AUTO, 'game-container');

game.state.add('boot', BootState);
game.state.add('load', LoadState);
game.state.add('play', PlayState);

game.state.start('boot');
