import { Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { count, theme } from "./State";
import Phaser from "phaser";
import { useSignalEffect } from "@preact/signals";
import { useEffect } from "preact/compat";

function create() {
  console.log("create");
  var circle = new Phaser.Geom.Circle(200, 200, 100);

  var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
  graphics.fillCircleShape(circle);
}

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      canvasStyle: "margin:0;padding:0",
      disableContextMenu: true,
      expandParent: true,
      // hidePhaser: true,
      inputMousePreventDefaultDown: true,
      inputMousePreventDefaultUp: true,
      parent: document.getElementById("canvas-container"),
      // resizeInterval: 100,
      scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      scene: {
        create: create,
      },
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

  return (
    <div className='main-container prevent-select' data-bs-theme='dark'>
      <div id='canvas-container'>
        <div className='top-left'>
          <h1>MapMancer</h1>
          <div>
            <Button onClick={() => count.value++}>count is {count}</Button>
          </div>
          <div className='mt-3'>
            <Button onClick={() => (theme.value = theme.value === "light" ? "dark" : "light")}>theme</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
