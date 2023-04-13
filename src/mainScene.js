import Phaser from "phaser";
import { grid } from "./State";
import { effect } from "@preact/signals";
import { mapRanges } from "./helpers";

export class MainScene extends Phaser.Scene {
  mapImage;
  grid;

  constructor() {
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
      const zoomStep = 0.2;
      const game = this.sys.game;
      let zoomTo = camera.zoom;

      if (p.deltaY > 0) {
        zoomTo *= 1 - zoomStep;
      } else if (p.deltaY < 0) {
        zoomTo *= 1 + zoomStep;
      }
      if (zoomTo < 0.05 || zoomTo > 2.5) {
        return;
      }

      // Zoom towards mouse pointer
      const cameraCenterInWorldX = camera.worldView.x + camera.worldView.width / 2;
      const cameraCenterInWorldY = camera.worldView.y + camera.worldView.height / 2;
      const mouseRelativeFromCameraX = game.input.mousePointer.worldX - cameraCenterInWorldX;
      const mouseRelativeFromCameraY = game.input.mousePointer.worldY - cameraCenterInWorldY;

      let magicNumber = zoomStep / (1 + zoomStep);
      if (p.deltaY > 0) {
        magicNumber = -zoomStep / (1 - zoomStep);
      }

      const xAdjust = mouseRelativeFromCameraX * magicNumber;
      const yAdjust = mouseRelativeFromCameraY * magicNumber;

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
      camera.scrollX += xAdjust;
      camera.scrollY += yAdjust;
    });

    const backgroundColor = "#000000";

    const overflowSize = 1000;
    // These rectangles cover the grid's overflowing parts.
    const leftCoverRect = this.add.rectangle(
      -overflowSize / 2,
      this.mapImage.source[0].height / 2,
      overflowSize,
      this.mapImage.source[0].height + overflowSize * 2,
      backgroundColor
    );
    leftCoverRect.setDepth(1);
    const rightCoverRect = this.add.rectangle(
      this.mapImage.source[0].width + overflowSize / 2,
      this.mapImage.source[0].height / 2,
      overflowSize,
      this.mapImage.source[0].height + overflowSize * 2,
      backgroundColor
    );
    rightCoverRect.setDepth(1);
    const topCoverRect = this.add.rectangle(
      this.mapImage.source[0].width / 2,
      -overflowSize / 2,
      this.mapImage.source[0].width,
      overflowSize,
      backgroundColor
    );
    topCoverRect.setDepth(1);
    const bottomCoverRect = this.add.rectangle(
      this.mapImage.source[0].width / 2,
      this.mapImage.source[0].height + overflowSize / 2,
      this.mapImage.source[0].width,
      overflowSize,
      backgroundColor
    );
    bottomCoverRect.setDepth(1);

    effect(() => {
      this.createGrid();
    });
  }

  createGrid() {
    const g = grid.value;
    if (this.grid) this.grid.destroy();
    if (!g.enabled) return;
    const color = g.color.substr(0, 7);
    const alpha = mapRanges(parseInt(g.color.length > 7 ? g.color.substr(7, 2) : "ff", 16), 0, 255, 0.05, 1);

    this.grid = this.add.grid(
      this.mapImage.source[0].width / 2 + g.offsetX,
      this.mapImage.source[0].height / 2 + g.offsetY,
      this.mapImage.source[0].width + Math.max(5, g.width) * 2,
      this.mapImage.source[0].height + Math.max(5, g.height) * 2,
      Math.max(5, g.width),
      Math.max(5, g.height),
      undefined,
      undefined,
      Phaser.Display.Color.HexStringToColor(color).color,
      alpha
    );
    this.grid.setDepth(0);
  }

  update() {}
}
