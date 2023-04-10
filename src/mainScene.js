import Phaser from "phaser";

export class MainScene extends Phaser.Scene {
  zoomTo = 1;

  constructor() {
    super();
  }

  preload() {
    this.load.image("forest_glade_map", "images/forest_glade_map.jpg");
  }

  create() {
    const camera = this.cameras.main;
    const forest_glade_map = this.textures.get("forest_glade_map");
    console.log(forest_glade_map.source[0].width);
    this.add.image(0, 0, "forest_glade_map").setOrigin(0, 0);
    camera.setBounds(0, 0, forest_glade_map.source[0].width, forest_glade_map.source[0].height);
    camera.setZoom(0.5);
    this.zoomTo = camera.zoom;

    // Drag map with mouse
    this.input.on("pointermove", (p) => {
      if (!p.isDown) return;
      camera.scrollX -= (p.x - p.prevPosition.x) / camera.zoom;
      camera.scrollY -= (p.y - p.prevPosition.y) / camera.zoom;
      // TODO: set movement boundaries
    });

    // Zoom on mouse wheel.
    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      const zoomStep = 0.2;

      if (deltaY > 0) {
        this.zoomTo *= 1 - zoomStep;
      } else if (deltaY < 0) {
        this.zoomTo *= 1 + zoomStep;
      }

      // TODO: zoom to mouse pointer

      this.zoomTo = Math.min(Math.max(this.zoomTo, 0.1), 2);

      const tweenConfig = {
        targets: camera,
        zoom: this.zoomTo,
        ease: "Linear",
        duration: 100,
        repeat: 0,
        yoyo: false,
      };

      this.tweens.add(tweenConfig);
    });
  }
}
