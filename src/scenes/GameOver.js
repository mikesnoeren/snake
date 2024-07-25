import { Scene } from 'phaser';
import settings from '../config/settings.js';
import translations from '../config/translations.js';
import { Button } from '../nodes/Button.js';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.deathMessage = data?.reason ?? translations.gameOver.reasonDefault;
        this.winner = data?.winner ?? false;
        // todo, show winner??
    }

    create() {
        this.cameras.main.setBackgroundColor(
            settings.colors.backgroundColor
        );

        this.add.text(
            settings.game.gridSize / 2,
            10,
            translations.gameOver.title,
            settings.fontStyle.heading
        ).setOrigin(0.5, 0);

        this.add.text(
            settings.game.gridSize / 2,
            150,
            this.deathMessage,
            settings.fontStyle.text
        ).setOrigin(0.5, 0);

        const buttonRestart = new Button(
            this,
            settings.game.gridSize / 2,
            350,
            translations.gameOver.buttonRestart,
            () => this.scene.start('MainMenu')
        );
    }
}



