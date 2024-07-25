import { Scene } from 'phaser';
import settings from '../config/settings.js';
import translations from '../config/translations.js';
import { Button } from '../nodes/Button.js';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.cameras.main.setBackgroundColor(
            settings.colors.backgroundColor
        );

        this.add.text(
            settings.game.gridSize / 2,
            10,
            translations.mainMenu.title,
            settings.fontStyle.heading
        ).setOrigin(0.5, 0);

        const buttonPlaySolo = new Button(
            this,
            settings.game.gridSize / 2,
            200,
            translations.mainMenu.playSingleplayer,
            () => this.scene.start('Game')
        );

        const buttonPlayDuo = new Button(
            this,
            settings.game.gridSize / 2,
            250,
            translations.mainMenu.playMultiplayer,
            () => this.scene.start('Game', {
                multiplayer: true
            })
        );
    }
}