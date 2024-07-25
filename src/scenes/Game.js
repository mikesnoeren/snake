import { Scene } from 'phaser';
import { Snake } from '../nodes/Snake.js';
import { Food } from '../nodes/Food.js';
import settings from '../config/settings.js';
import translations from '../config/translations.js';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    init(data) {
        this.multiplayer = data?.multiplayer ?? false;
    }

    create() {
        this.nextGameTick = 0;
        this.gameSpeed = 100;

        this.cells = settings.game.cells;
        this.cellSize = settings.game.cellSize;

        this.snakes = [
            new Snake(
                'Player A',
                this,
                this.cellSize * 5,
                this.cellSize * (this.cells - 5),
                'right',
                Phaser.Display.Color.HexStringToColor(
                    settings.colors.snakes[0]
                ),
                'w',
                'd',
                's',
                'a'
            )
        ];

        if (this.multiplayer) {
            this.snakes.push(
                new Snake(
                    'Player B',
                    this,
                    this.cellSize * (this.cells - 6),
                    this.cellSize * 5,
                    'left',
                    Phaser.Display.Color.HexStringToColor(
                        settings.colors.snakes[1]
                    ),
                    'ArrowUp',
                    'ArrowRight',
                    'ArrowDown',
                    'ArrowLeft'
                )
            );
        }

        const foodPosition = this.getRandomEmptyPositionOnMap();
        this.food = new Food(
            this,
            foodPosition.x,
            foodPosition.y,
            0xdc2626
        );

        this.drawGameHints();

        this.cameras.main.setBackgroundColor(
            settings.colors.backgroundColor
        );
    }

    drawGameHints() {
        let hints = [];

        if (this.multiplayer) {
            hints.push(
                this.add.text(
                    settings.game.gridSize / 2,
                    10,
                    translations.game.gameHintMultiplayerPlayer1,
                    settings.fontStyle.text
                ).setOrigin(0.5, 0)
            );

            hints.push(
                this.add.text(
                    settings.game.gridSize / 2,
                    settings.game.gridSize - 10,
                    translations.game.gameHintMultiplayerPlayer2,
                    settings.fontStyle.text
                ).setOrigin(0.5, 1)
            );
        } else {
            hints.push(
                this.add.text(
                    settings.game.gridSize / 2,
                    10,
                    translations.game.gameHintSingleplayer,
                    settings.fontStyle.text
                ).setOrigin(0.5, 0)
            );
        }

        this.time.delayedCall(3000, () => {
            hints.forEach(hint => {
                this.tweens.add({
                    targets: hint,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () => hint.destroy()
                });
            });
        });
    }

    checkCollide(items, compare, startIndex = 0, returnCollidingItem = false) {
        return Phaser.Actions.GetFirst(
            items, {
                x: compare.x,
                y: compare.y
            }, startIndex) !== null;
    }

    getRandomEmptyPositionOnMap() {
        const elements = this.snakes.flatMap(snake => snake.body.getChildren());
        let coords, isColliding;

        do {
            coords = {
                x: Math.floor(Math.random() * this.cells) * this.cellSize,
                y: Math.floor(Math.random() * this.cells) * this.cellSize
            };

            isColliding = this.checkCollide(elements, coords);
        } while (isColliding);

        return coords;
    }

    checkCollideWithFood(snake, foodPos) {
        let isColliding = this.checkCollide(
            [snake.headPosition], foodPos
        );

        if (isColliding) {
            snake.handleCollideWithFood();
            this.food.reposition();
        }
    }

    checkCollideWithSnake(index, snake) {
        this.snakes.forEach((otherSnake, otherIndex) => {
            if (index === otherIndex) return;

            let isColliding = this.checkCollide(
                otherSnake.body.getChildren(), snake.headPosition, 0, true
            );

            if (isColliding) {
                snake.handleCollideWithSnake();
            }
        });
    }

    update(time, delta) {
        if (time >= this.nextGameTick) {
            const foodPos = this.food.foodPosition;

            this.snakes.forEach((snake, index) => {
                snake.update(time);

                this.checkCollideWithFood(snake, foodPos);
                this.checkCollideWithSnake(index, snake);
            });

            this.nextGameTick = time + this.gameSpeed;
        }
    }
}