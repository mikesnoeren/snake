import settings from '../config/settings.js';

export class Button {
    constructor(scene, x, y, text = 'button', action) {
        this.scene = scene;
        this.action = action;

        this.button = new Phaser.GameObjects.Text(
            this.scene,
            x,
            y,
            text,
            settings.buttonStyle.default
        ).setOrigin(0.5, 0).setInteractive();

        this.scene.add.existing(this.button);

        this.button.on('pointerover', () => {
            this.button.setStyle(settings.buttonStyle.hover);
        });

        this.button.on('pointerout', () => {
            this.button.setStyle(settings.buttonStyle.default);
        });

        this.button.on('pointerdown', () => {
            this.button.setStyle(settings.buttonStyle.active);
        });

        this.button.on('pointerup', () => {
            if (this.action) {
                this.action();
            }
        });
    }
}