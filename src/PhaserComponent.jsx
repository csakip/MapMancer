import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Phaser from "phaser";
import { MainScene } from "./mainScene";
import { useEffect } from "preact/hooks";

// Sets up Phaser
export default function PhaserComponent(props) {
  useEffect(() => {
    const scene = new MainScene();

    const config = {
      type: Phaser.AUTO,
      disableContextMenu: true,
      expandParent: true,
      // hidePhaser: true,
      inputMousePreventDefaultDown: true,
      inputMousePreventDefaultUp: true,
      parent: document.getElementById("canvas-container"),
      scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      scene: scene,
      postBoot: () => {
        console.log("Loaded");
      },
    };
    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
      console.log("Destroyed");
    };
  }, []);

  return <div id='canvas-container'>{props.children}</div>;
}
