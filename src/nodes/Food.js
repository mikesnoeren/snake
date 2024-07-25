import settings from '../config/settings.js';

export class Food {
    constructor(scene, x, y, color) {
        this.scene = scene;
        this.foodSize = settings.game.cellSize;
        this.foodInnerSize = this.foodSize / 2;
        this.color = color;
        this.foodPosition = new Phaser.Math.Vector2(x, y);

        this.foodOuter = new Phaser.GameObjects.Rectangle(
            this.scene,
            this.foodPosition.x,
            this.foodPosition.y,
            this.foodSize,
            this.foodSize
        );

        this.foodInner = new Phaser.GameObjects.Rectangle(
            this.scene,
            this.foodPosition.x + (this.foodInnerSize / 2),
            this.foodPosition.y + (this.foodInnerSize / 2),
            this.foodInnerSize,
            this.foodInnerSize,
            this.color
        ).setOrigin(0);

        this.scene.add.existing(this.foodOuter);
        this.scene.add.existing(this.foodInner);
    }

    reposition(x, y) {
        const newPosition = this.scene.getRandomEmptyPositionOnMap();

        this.foodPosition.x = newPosition.x;
        this.foodPosition.y = newPosition.y;

        this.foodInner.x = this.foodPosition.x + (this.foodInnerSize / 2);
        this.foodInner.y = this.foodPosition.y + (this.foodInnerSize / 2);
    }
}