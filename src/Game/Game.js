import React from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";

const GameScene = () => {
  const game = {
    type: Phaser.AUTO,
    width: 800,
    height: 560,
    backgroundColor: "#333",
    canvasStyle: "display: block; margin: 0 auto;",
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  function preload() {
    this.load.image("coin", "assets/coin.png");
    this.load.image("player", "assets/player.png");
  }

  let snake;
  let food;
  let cursors;

  let UP = 0;
  let DOWN = 1;
  let LEFT = 2;
  let RIGHT = 3;

  function create() {
    const Food = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,

      initialize: function Food(scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);

        this.setTexture("coin");
        this.setPosition(x * 16, y * 16);
        this.setScale(1.3);
        this.setOrigin(0);

        this.total = 0;

        scene.children.add(this);
      },

      eat: function () {
        this.total++;

        const x = Phaser.Math.Between(0, 39);
        const y = Phaser.Math.Between(0, 29);

        this.setPosition(x * 16, y * 16);
      },
    });

    const Snake = new Phaser.Class({
      initialize: function Snake(scene, x, y) {
        this.headPosition = new Phaser.Geom.Point(x, y);

        this.body = scene.add.group();

        this.head = this.body.create(x * 16, y * 16, "player");
        this.head.setOrigin(0);

        this.alive = true;

        this.speed = 100;

        this.moveTime = 0;

        this.tail = new Phaser.Geom.Point(x, y);

        this.heading = RIGHT;
        this.direction = RIGHT;
      },

      update: function (time) {
        if (time >= this.moveTime) {
          return this.move(time);
        }
      },

      faceLeft: function () {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = LEFT;
        }
      },

      faceRight: function () {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = RIGHT;
        }
      },

      faceUp: function () {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = UP;
        }
      },

      faceDown: function () {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = DOWN;
        }
      },

      move: function (time) {
        switch (this.heading) {
          case LEFT:
            this.headPosition.x = Phaser.Math.Wrap(
              this.headPosition.x - 1,
              0,
              50
            );
            break;

          case RIGHT:
            this.headPosition.x = Phaser.Math.Wrap(
              this.headPosition.x + 1,
              0,
              50
            );
            break;

          case UP:
            this.headPosition.y = Phaser.Math.Wrap(
              this.headPosition.y - 1,
              0,
              35
            );
            break;

          case DOWN:
            this.headPosition.y = Phaser.Math.Wrap(
              this.headPosition.y + 1,
              0,
              35
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

          return false;
        } else {
          this.moveTime = time + this.speed;

          return true;
        }
      },

      grow: function () {
        const newPart = this.body.create(this.tail.x, this.tail.y, "player");

        newPart.setOrigin(0);
      },

      collideWithFood: function (food) {
        if (this.head.x === food.x && this.head.y === food.y) {
          this.grow();

          food.eat();

          // if (this.speed > 20 && food.total % 5 === 0) {
          //   this.speed -= 5;
          // }

          return true;
        } else {
          return false;
        }
      },

      updateGrid: function (grid) {
        this.body.children.each(function (segment) {
          const bx = segment.x / 16;
          const by = segment.y / 16;

          grid[by][bx] = false;
        });

        return grid;
      },
    });

    food = new Food(this, 3, 4);

    snake = new Snake(this, 10, 10);

    cursors = this.input.keyboard.createCursorKeys();
  }

  function update(time, delta) {
    if (!snake.alive) {
      return;
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
      snake.collideWithFood(food);
    }

    if (snake.update(time)) {
      if (snake.collideWithFood(food)) {
        repositionFood();
      }
    }

    function repositionFood() {
      const testGrid = [];

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
        const pos = Phaser.Math.RND.pick(validLocations);

        food.setPosition(pos.x * 16, pos.y * 16);

        return true;
      } else {
        return false;
      }
    }
  }

  return <IonPhaser game={game} />;
};

export default GameScene;
