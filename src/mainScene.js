import Phaser from "phaser";
import { grid } from "./State";
import { effect } from "@preact/signals";

export class MainScene extends Phaser.Scene {
  mapImage;
  grid;

  constructor(game) {
    super();
  }

  preload() {
    this.load.image("forest_glade_map", "images/forest_glade_map.jpg");
  }

  create() {
    const camera = this.cameras.main;
    this.mapImage = this.textures.get("forest_glade_map");
    this.add.image(0, 0, "forest_glade_map").setOrigin(0, 0);
    camera.centerOn(this.mapImage.source[0].width / 2, this.mapImage.source[0].height / 2);
    camera.setZoom(1);

    // Drag map with mouse
    this.input.on("pointermove", (p) => {
      if (!p.isDown) return;
      camera.scrollX -= (p.x - p.prevPosition.x) / camera.zoom;
      camera.scrollY -= (p.y - p.prevPosition.y) / camera.zoom;
      // TODO: set movement boundaries
    });

    // Zoom on mouse wheel.
    this.input.on("wheel", (p) => {
      const zoomStep = 0.3;
      const game = this.sys.game;
      let zoomTo = camera.zoom;

      if (p.deltaY > 0) {
        zoomTo *= 1 - zoomStep;
      } else if (p.deltaY < 0) {
        zoomTo *= 1 + zoomStep;
      }
      let hitZoomExtremes = false;
      if (zoomTo < 0.05) {
        zoomTo = 0.05;
        hitZoomExtremes = true;
      }
      if (zoomTo > 2.5) {
        zoomTo = 2.5;
        hitZoomExtremes = true;
      }
      zoomTo = Math.min(Math.max(zoomTo, 0.05), 2.5);

      // Zoom towards mouse pointer
      const cameraCenterInWorldX = camera.worldView.x + camera.worldView.width / 2;
      const cameraCenterInWorldY = camera.worldView.y + camera.worldView.height / 2;
      const mouseRelativeFromCameraX = game.input.mousePointer.worldX - cameraCenterInWorldX;
      const mouseRelativeFromCameraY = game.input.mousePointer.worldY - cameraCenterInWorldY;

      let magicNumber = 0.23;
      if (p.deltaY > 0) {
        magicNumber = 0.435;
      }

      const xAdjust = mouseRelativeFromCameraX * magicNumber * -Math.sign(p.deltaY);
      const yAdjust = mouseRelativeFromCameraY * magicNumber * -Math.sign(p.deltaY);

      // const tweenConfig = {
      //   targets: camera,
      //   zoom: zoomTo,
      //   ease: "Linear",
      //   duration: 100,
      //   repeat: 0,
      //   yoyo: false,
      //   scrollX: camera.scrollX + xAdjust,
      //   scrollY: camera.scrollY + yAdjust,
      // };

      // this.tweens.add(tweenConfig);
      camera.zoom = zoomTo;
      if (!hitZoomExtremes) {
        camera.scrollX += xAdjust;
        camera.scrollY += yAdjust;
      }
    });

    effect(() => {
      console.log("effing");
      this.createGrid();
    });
  }
  createGrid() {
    const g = grid.value;
    if (this.grid) this.grid.destroy();
    this.grid = this.add.grid(
      this.mapImage.source[0].width / 2 + g.offsetX,
      this.mapImage.source[0].height / 2 + g.offsetY,
      this.mapImage.source[0].width + g.width * 2,
      this.mapImage.source[0].height + g.height * 2,
      g.width,
      g.height,
      undefined,
      undefined,
      g.color,
      g.alpha
    );
  }
  update() {}
}
