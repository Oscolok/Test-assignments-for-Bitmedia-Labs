import Phaser from "phaser";

export class SceneB extends Phaser.Scene {
  constructor() {
    super("SceneB");
  }

  create() {
    this.lights.enable();

    let atlasTexture = this.textures.get("megaset");

    let frames = atlasTexture.getFrameNames();

    Phaser.Utils.Array.Shuffle(frames);

    for (let i = 0; i < frames.length; i++) {
      let x = Phaser.Math.Between(100, 700);
      let y = Phaser.Math.Between(100, 500);

      this.add.image(x, y, "megaset", frames[i]).setPipeline("Light2D");
    }

    this.add.image(120, 160, "megaset", "contra2");
  }
}
