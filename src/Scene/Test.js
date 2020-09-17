import Phaser, { Scene } from "phaser";

// const Test = {
//   init: function () {
//     this.cameras.main.setBackgroundColor("#24252A");
//   },
//   create: function () {
//     this.helloWorld = this.add.text(
//       this.cameras.main.centerX,
//       this.cameras.main.centerY,
//       "Hello World",
//       {
//         font: "40px Arial",
//         fill: "#ffffff",
//       }
//     );
//     this.helloWorld.setOrigin(0.5);
//   },
//   update: function () {
//     this.helloWorld.angle += 1;
//   },
// };

export var demo = new Phaser.Scene("Demo");

demo.preload = function () {
  this.load.image("face", "assets/pics/bw-face.png");
};

demo.create = function () {
  console.log(this.sys.settings.key, "is alive");

  this.add.image(400, 300, "face");

  this.scene.launch("Test");
};

export var test = new Phaser.Scene("Test");

test.preload = function () {
  this.load.image("barbarian", "assets/pics/barbarian-loading.png");
};

test.create = function () {
  console.log(this.sys.settings.key, "is alive");

  this.add.image(400, 300, "barbarian").setScale(0.5);
};
