import { MainMenu } from './scenes/MainMenu.js';
import { Game } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';
import settings from './config/settings.js';

const config = {
    type: Phaser.AUTO,
    width: settings.game.gridSize,
    height: settings.game.gridSize,
    parent: 'game',
    fullscreenElement: 'game',
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        MainMenu,
        Game,
        GameOver,
    ]
};

export default new Phaser.Game(config);
// todo: cleanup all files