import Game from './model/Game.js';
import GameView from './view/GameView.js';
import GameController from './controller/GameController.js';

new GameController(new Game(), new GameView()).init();
