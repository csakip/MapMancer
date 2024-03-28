import frag from "./gridFrag.glsl?url";
export function init(k) {
  let cameraPosition = k.camPos();
  let cameraScale = 1;
  let gridOffset = k.vec2(0, 0);
  console.log(frag);

  console.log(k.loadShaderURL("grid", null, frag));

  k.loadSprite(
    "large-image",
    "https://images.squarespace-cdn.com/content/v1/62750da488ff573e9bdc63c4/abd01574-7009-44d3-b717-e9c9ddf31445/TC_Thestwick+Watch+Ruins+04+Lookout+Lair_No+Grid_44x34.jpg"
  );

  k.add([
    k.sprite("large-image"),
    k.shader("grid", () => ({
      u_scale: cameraScale,
      u_offset: k.toScreen(gridOffset),
    })),
  ]);

  // Mouse handling
  k.onUpdate(() => {
    if (k.isMouseDown("left") && k.isMouseMoved()) {
      cameraPosition = cameraPosition.sub(k.mouseDeltaPos().scale(1 / cameraScale));
      k.camPos(cameraPosition);
    }
  });

  k.onScroll((delta) => {
    let scaleFactor = 0.85;
    if (delta.y < 0) {
      scaleFactor = 1 / scaleFactor;
    }

    const mouseWorldPos = k.toWorld(k.mousePos());
    const deltaPos = cameraPosition.sub(mouseWorldPos);
    const newDeltaPos = deltaPos.scale(1 / scaleFactor);
    cameraPosition = cameraPosition.sub(deltaPos.sub(newDeltaPos));

    k.camPos(cameraPosition);
    cameraScale = cameraScale * scaleFactor;
    k.camScale(cameraScale);
  });
}
