import 'pixi';
import 'p2';
import 'phaser';

import config from './config';
import gameState from './scenes/main';

const game = new Phaser.Game(config);

game.state.add('gameState', gameState);

game.state.start('gameState');

