import { Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { count, theme } from "./State";
import Phaser from "phaser";
import { useSignalEffect } from "@preact/signals";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

function create() {
  var circle = new Phaser.Geom.Circle(200, 200, 100);

  var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
  graphics.fillCircleShape(circle);
}

function App() {
  useSignalEffect(() => {
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
      scene: {
        create: create,
        init: afterScene,
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

  async function afterScene() {
    const { data, error } = await supabase.auth.admin.listUsers();
    console.log(data, error);
  }

  return (
    <div className='main-container prevent-select'>
      <div id='canvas-container'>
        <div className='top-left'>
          <h1>MapMancer</h1>
          <div>
            <Button onClick={() => count.value++} variant='secondary' size='sm'>
              count is {count}
            </Button>
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
