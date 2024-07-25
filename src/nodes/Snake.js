import settings from '../config/settings.js';
import translations from '../config/translations.js';

export class Snake {
    constructor(title, scene, x, y, heading, color, upKey, rightKey, downKey, leftKey) {
        this.scene = scene;
        this.gridSize = settings.game.gridSize;
        this.cellSize = settings.game.cellSize;

        this.title = title;
        this.direction = heading;
        this.newDirection = heading;
        this.snakeTick = 0;
        this.speed = 100;
        this.upKey = upKey;
        this.rightKey = rightKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.color = color.color;
        this.headPosition = new Phaser.Math.Vector2(x, y);
        this.tailPosition = new Phaser.Math.Vector2(x, y);
        this.body = this.scene.add.group();

        this.createBodyPart(
            this.headPosition.x,
            this.headPosition.y,
            color.lighten(25).color
        );

        this.keyboardInput();
    }

    createBodyPart(x, y, color) {
        let rectangle = new Phaser.GameObjects.Rectangle(
            this.scene,
            x,
            y,
            this.cellSize,
            this.cellSize,
            color
        ).setOrigin(0, 0);

        this.body.add(rectangle);
        this.scene.add.existing(rectangle);
    }

    keyboardInput() {
        // Handles keyboard inputs to change the snake's direction
        this.scene.input.keyboard.on('keydown', e => {
            switch (e.key) {
                case this.upKey:
                    this.newDirection = this.direction !== 'down' ? 'up' : 'down';
                    break;

                case this.rightKey:
                    this.newDirection = this.direction !== 'left' ? 'right' : 'left';
                    break;

                case this.downKey:
                    this.newDirection = this.direction !== 'up' ? 'down' : 'up';
                    break;

                case this.leftKey:
                    this.newDirection = this.direction !== 'right' ? 'left' : 'right';
                    break;
            }
        });
    }

    checkCollideWithSelf() {
        // No need to check for collision if the snake length is less than or equal to four as it can't collide with itself
        if (this.body.getTotalUsed() <= 4) return;

        let isColliding = this.scene.checkCollide(
            this.body.getChildren(),
            this.headPosition,
            1
        );

        if (isColliding) {
            this.handleCollideWithSelf();
        }
    }

    getOtherSnake() {
        return this.scene.snakes.find(snake => snake !== this);
    }

    handleCollideWithFood() {
        this.createBodyPart(
            this.tailPosition.x,
            this.tailPosition.y,
            this.color
        );
    }

    handleCollideWithSelf() {
        const winner = this.getOtherSnake()?.title;

        this.scene.scene.start('GameOver', {
            reason: translations.gameOver.reasonCollideWithSelf,
            winner: winner
        });
    }

    handleCollideWithSnake() {
        const winner = this.getOtherSnake()?.title;

        this.scene.scene.start('GameOver', {
            reason: translations.gameOver.reasonCollideWithSnake,
            winner: winner
        });
    }

    move() {
        // Set the new direction, this should only happen every time the move function is called to avoid 180 degree turns
        this.direction = this.newDirection;

        // Move the head of the snake based on its direction.
        switch (this.direction) {
            case 'up':
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y -= this.cellSize, 0, this.gridSize);
                break;

            case 'down':
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y += this.cellSize, 0, this.gridSize);
                break;

            case 'right':
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x += this.cellSize, 0, this.gridSize);
                break;

            case 'left':
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x -= this.cellSize, 0, this.gridSize);
                break;
        }

        // Shift existing body parts to their new positions
        Phaser.Actions.ShiftPosition(
            this.body.children.entries,
            this.headPosition.x,
            this.headPosition.y,
            1,
            this.tailPosition
        );
    }

    update(time) {
        if (time >= this.snakeTick) {
            this.move();
            this.checkCollideWithSelf();
            this.snakeTick = time + this.speed;
        }
    }
}