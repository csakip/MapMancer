import Phaser from "phaser";
import { grid } from "./State";
import { effect } from "@preact/signals";
import { mapRanges } from "./helpers";

export class MainScene extends Phaser.Scene {
  mapImage; // Background image to load to.
  gridObjects = {}; // Holds refs to the grid for updating.

  constructor() {
    super();
  }

  preload() {
    this.load.image("forest_glade_map", "images/forest_glade_map.jpg");
    this.load.image("tile", "images/tile.png");
  }

  create() {
    const camera = this.cameras.main;
    this.mapImage = this.textures.get("forest_glade_map");
    this.add.image(0, 0, "forest_glade_map").setOrigin(0, 0);
    camera.centerOn(this.mapImage.source[0].width / 2, this.mapImage.source[0].height / 2);
    camera.setZoom(0.3);

    this.createGrid();

    this.text = this.add.text(200, 200, "", { fontSize: "50px" });

    this.setupMouse();

    effect(() => {
      this.createGrid();
    });
  }

  createGrid() {
    const g = grid.value;
    if (!g.enabled) {
      if (this.gridObjects.gridRenderTexture) {
        this.textures.get("gridTexture").destroy();
        this.gridObjects.gridRenderTexture.destroy();
        this.gridObjects.tileSprite.destroy();
        this.gridObjects.graphics.destroy();
        this.gridObjects = {};
      }
      return;
    }

    const tileWidth = Math.max(g.width, 5);
    const tileHeight = Math.max(g.height, 5);

    if (!this.gridObjects.gridRenderTexture) {
      this.gridObjects.gridRenderTexture = this.add.renderTexture(0, 0, tileWidth, tileHeight).setVisible(false);
    } else {
      this.gridObjects.gridRenderTexture.setSize(tileWidth, tileHeight);
    }

    const gridColor = Phaser.Display.Color.HexStringToColor(g.color.substr(0, 7)).color;
    const gridAlpha = mapRanges(parseInt(g.color.length > 7 ? g.color.substr(7, 2) : "ff", 16), 0, 255, 0.05, 1);
    const lineWidth = Math.max(0.1, g.lineWidth);
    const halfWidth = lineWidth / 2;

    const lines = [];
    lines.push(new Phaser.Geom.Line(0, halfWidth, tileWidth, halfWidth));
    lines.push(new Phaser.Geom.Line(halfWidth, 0, halfWidth, tileHeight));

    if (!this.gridObjects.graphics) {
      this.gridObjects.graphics = this.add.graphics({ lineStyle: { width: lineWidth, color: gridColor, alpha: 1 } });
      this.gridObjects.graphics.setVisible(false);
    } else {
      this.gridObjects.graphics.clear();
      this.gridObjects.graphics.lineStyle(lineWidth, gridColor, 1);
    }

    lines.forEach((line) => {
      this.gridObjects.graphics.strokeLineShape(line);
    });
    this.gridObjects.gridRenderTexture.clear();
    this.gridObjects.gridRenderTexture.draw(this.gridObjects.graphics);

    if (!this.gridObjects.tileSprite) {
      this.gridObjects.gridRenderTexture.saveTexture("gridTexture");
      this.gridObjects.tileSprite = this.add.tileSprite(
        this.mapImage.source[0].width / 2,
        this.mapImage.source[0].height / 2,
        this.mapImage.source[0].width,
        this.mapImage.source[0].height,
        "gridTexture"
      );
      this.gridObjects.tileSprite.setDepth(2);
    } else {
      this.gridObjects.tileSprite.setTexture("gridTexture");
    }
    this.gridObjects.tileSprite.tilePositionX = 1 - g.offsetX;
    this.gridObjects.tileSprite.tilePositionY = 1 - g.offsetY;
    this.gridObjects.tileSprite.setAlpha(gridAlpha);
  }

  setupMouse() {
    const camera = this.cameras.main;
    // Drag map with mouse
    this.input.on("pointermove", (p) => {
      this.text.setText(parseInt(p.worldX) + ", " + parseInt(p.worldY));
      if (!p.isDown) return;
      camera.scrollX -= (p.x - p.prevPosition.x) / camera.zoom;
      camera.scrollY -= (p.y - p.prevPosition.y) / camera.zoom;
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
  }

  createGridold() {
    const g = grid.value;
    if (this.grid) this.grid.destroy();
    if (!g.enabled) return;
    const color = g.color.substr(0, 7);
    const alpha = mapRanges(parseInt(g.color.length > 7 ? g.color.substr(7, 2) : "ff", 16), 0, 255, 0.05, 1);

    this.grid = this.add.grid(
      this.mapImage.source[0].width / 2 + g.offsetX,
      this.mapImage.source[0].height / 2 + g.offsetY,
      this.mapImage.source[0].width + Math.max(5, tileWidth) * 2,
      this.mapImage.source[0].height + Math.max(5, tileHeight) * 2,
      Math.max(5, tileWidth),
      Math.max(5, tileHeight),
      undefined,
      undefined,
      Phaser.Display.Color.HexStringToColor(color).color,
      alpha
    );
    this.grid.setDepth(0);
  }
}
