import React, { useEffect } from "react";
import Phaser from "phaser";

const GameScene = ({ test }) => {
  let snake;
  let food;
  let cursors;
  let score = 0;
  let endGameText;
  let endGameBtnText;
  let level = 1;
  let roundTimer;

  let UP = 0;
  let DOWN = 1;
  let LEFT = 2;
  let RIGHT = 3;

  class gameScene extends Phaser.Scene {
    constructor() {
      super({ key: "gameArea" });
    }

    preload() {
      this.load.image("coin", "assets/coin.png");
      this.load.image("player", "assets/player.png");
    }

    create() {
      const Food = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,

        initialize: function Food(scene, x, y) {
          Phaser.GameObjects.Image.call(this, scene);

          this.setTexture("coin");
          this.setPosition(x * 16, y * 16);
          this.setOrigin(0);

          scene.children.add(this);
        },

        eat: function () {
          score = score + 6.25;
        },
      });

      const Snake = new Phaser.Class({
        initialize: function Snake(scene, x, y) {
          this.headPosition = new Phaser.Geom.Point(x, y);

          this.body = scene.add.group();

          this.head = this.body.create(x * 16, y * 16, "player");
          this.head.setScale(0.7);
          this.head.setOrigin(0);

          this.alive = true;

          this.speed = 0;

          switch (level) {
            case 1:
              this.speed = 100;
              break;
            case 2:
              this.speed = 95;
              break;
            case 3:
              this.speed = 90;
              break;
            case 4:
              this.speed = 85;
              break;
            case 5:
              this.speed = 80;
              break;
            case 6:
              this.speed = 75;
              break;
            case 7:
              this.speed = 70;
              break;
            case 8:
              this.speed = 65;
              break;
            case 9:
              this.speed = 60;
              break;
            case 10:
              this.speed = 55;
              break;
            default:
          }

          this.moveTime = 0;

          this.tail = new Phaser.Geom.Point(x, y);

          this.heading = RIGHT;
          this.direction = RIGHT;
        },

        update(time) {
          if (time >= this.moveTime) {
            return this.move(time);
          }
        },

        faceLeft() {
          if (this.direction === UP || this.direction === DOWN) {
            this.heading = LEFT;
          }
        },

        faceRight() {
          if (this.direction === UP || this.direction === DOWN) {
            this.heading = RIGHT;
          }
        },

        faceUp() {
          if (this.direction === LEFT || this.direction === RIGHT) {
            this.heading = UP;
          }
        },

        faceDown() {
          if (this.direction === LEFT || this.direction === RIGHT) {
            this.heading = DOWN;
          }
        },

        move(time) {
          switch (this.heading) {
            case LEFT:
              this.headPosition.x = Phaser.Math.Wrap(
                this.headPosition.x - 1,
                0,
                40
              );
              break;

            case RIGHT:
              this.headPosition.x = Phaser.Math.Wrap(
                this.headPosition.x + 1,
                0,
                40
              );
              break;

            case UP:
              this.headPosition.y = Phaser.Math.Wrap(
                this.headPosition.y - 1,
                0,
                30
              );
              break;

            case DOWN:
              this.headPosition.y = Phaser.Math.Wrap(
                this.headPosition.y + 1,
                0,
                30
              );
              break;

            default:
          }

          this.direction = this.heading;

          Phaser.Actions.ShiftPosition(
            this.body.getChildren(),
            this.headPosition.x * 16,
            this.headPosition.y * 16,
            1,
            this.tail
          );

          const hitBody = Phaser.Actions.GetFirst(
            this.body.getChildren(),
            { x: this.head.x, y: this.head.y },
            1
          );

          if (hitBody) {
            this.alive = false;
            clearTimeout(roundTimer);

            return false;
          } else {
            this.moveTime = time + this.speed;

            return true;
          }
        },

        grow() {
          const newPart = this.body.create(this.tail.x, this.tail.y, "player");
          newPart.setScale(0.7);
          newPart.setOrigin(0);
        },

        collideWithFood(food) {
          if (this.head.x === food.x && this.head.y === food.y) {
            this.grow();

            food.eat();

            scoreText.setText(`${Math.round(score)}%`);

            return true;
          } else {
            return false;
          }
        },

        updateGrid(grid) {
          this.body.children.each(function (segment) {
            var bx = segment.x / 16;
            var by = segment.y / 16;

            grid[by][bx] = false;
          });
          return grid;
        },
      });

      const scoreText = this.add.text(16, 16, `0%`, {
        fontSize: "32px",
        fill: "#fff",
      });

      this.add.text(450, 16, `Lvl: ${level}/10`, {
        fontSize: "32px",
        fill: "#fff",
      });

      roundTimer = setTimeout(() => {
        endGameText = "YOU DIE";
        endGameBtnText = "Restart";
        this.scene.start("overMenu");
      }, 60000);

      food = new Food(this, 18, 14);
      snake = new Snake(this, 22, 14);

      cursors = this.input.keyboard.createCursorKeys();
    }

    update(time) {
      if (!snake.alive) {
        endGameText = "YOU DIE";
        endGameBtnText = "Restart";
        this.scene.start("overMenu");
        return;
      }

      if (score === 100) {
        clearTimeout(roundTimer);
        endGameText = "YOU WIN";
        endGameBtnText = "Next level";
        level++;
        this.scene.start("overMenu");
      }

      if (cursors.left.isDown) {
        snake.faceLeft();
      } else if (cursors.right.isDown) {
        snake.faceRight();
      } else if (cursors.up.isDown) {
        snake.faceUp();
      } else if (cursors.down.isDown) {
        snake.faceDown();
      }

      if (snake.update(time)) {
        if (snake.collideWithFood(food)) {
          repositionFood();
        }
      }

      function repositionFood() {
        let testGrid = [];

        for (let y = 0; y < 30; y++) {
          testGrid[y] = [];

          for (let x = 0; x < 40; x++) {
            testGrid[y][x] = true;
          }
        }

        snake.updateGrid(testGrid);

        let validLocations = [];

        for (let y = 0; y < 30; y++) {
          for (let x = 0; x < 40; x++) {
            if (testGrid[y][x] === true) {
              validLocations.push({ x: x, y: y });
            }
          }
        }

        if (validLocations.length > 0) {
          const randomNumber = Math.floor(
            Math.random() * Math.floor(validLocations.length)
          );

          const pos = validLocations[randomNumber];

          food.setPosition(pos.x * 16, pos.y * 16);

          return true;
        } else {
          return false;
        }
      }
    }
  }

  class startScene extends Phaser.Scene {
    constructor() {
      super({ key: "startMenu" });
    }

    preload() {}

    create() {
      const gameOverText = this.add.text(120, 150, "SNAKE GAME", {
        fontSize: "64px",
        fill: "#fff",
      });

      const startGameText = this.add.text(190, 300, "Start Game", {
        fontSize: "20px",
        fill: "#fff",
      });

      const scoreBoardText = this.add.text(350, 300, "Rating", {
        fontSize: "20px",
        fill: "#fff",
      });

      this.add
        .zone(
          startGameText.x - startGameText.width * startGameText.originX - 16,
          startGameText.y - startGameText.height * startGameText.originY - 16,
          startGameText.width + 32,
          startGameText.height + 32
        )
        .setOrigin(0, 0)
        .setInteractive()
        .once("pointerup", () => this.scene.start("gameArea"));
    }
  }

  class overScene extends Phaser.Scene {
    constructor() {
      super({ key: "overMenu" });
    }

    preload() {}

    create() {
      const gameOverText = this.add.text(180, 150, endGameText, {
        fontSize: "64px",
        fill: "#fff",
      });

      const gameOverBtnText = this.add.text(200, 300, endGameBtnText, {
        fontSize: "20px",
        fill: "#fff",
      });

      const scoreBoardText = this.add.text(350, 300, "Rating", {
        fontSize: "20px",
        fill: "#fff",
      });

      this.add
        .zone(
          gameOverBtnText.x -
            gameOverBtnText.width * gameOverBtnText.originX -
            16,
          gameOverBtnText.y -
            gameOverBtnText.height * gameOverBtnText.originY -
            16,
          gameOverBtnText.width + 32,
          gameOverBtnText.height + 32
        )
        .setOrigin(0, 0)
        .setInteractive()
        .once("pointerup", () => this.scene.start("gameArea"), (score = 0));
    }
  }

  const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: "#333",
    canvasStyle: "display: block; margin: 0 auto;",
    scene: [startScene, gameScene, overScene],
  };

  useEffect(() => {
    new Phaser.Game(config);
  }, [test]);

  return <div></div>;
};

export default GameScene;
