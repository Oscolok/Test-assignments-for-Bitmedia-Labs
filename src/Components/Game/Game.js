import React, { useState } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import { GameZone } from "../Scene/GameZone";
import { SceneB } from "../Scene/GameOver";

const GameScene = () => {
  const game = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: "#333",
    canvasStyle: "display: block; margin: 0 auto;",
    scene: [SceneB, GameZone],
  };

  return <IonPhaser game={game} />;
};

export default GameScene;
