import { useSignal } from "@preact/signals";
import produce from "immer";
import { Button, FormLabel } from "react-bootstrap";
import { grid, showHelpTextDefault } from "../State";
import InputNumber from "./InputNumber";

export default function GridUI() {
  const gridSizeLinked = useSignal(true);

  function changeOffset(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    if (isNaN(x) || isNaN(y)) return;
    grid.value = produce(grid.value, (g) => {
      g.offsetX = x;
      if (g.offsetX < 0) g.offsetX += g.width;
      if (g.offsetX > g.width) g.offsetX -= g.width;
      g.offsetY = y;
      if (g.offsetY < 0) g.offsetY += g.height;
      if (g.offsetY > g.height) g.offsetY -= g.height;
    });
  }

  function toggleLinked() {
    gridSizeLinked.value = !gridSizeLinked.value;
    if (gridSizeLinked.value)
      grid.value = produce(grid.value, (g) => {
        g.height = g.width;
      });
  }

  function changeSize(w, h) {
    w = parseInt(w);
    h = parseInt(h);
    if (isNaN(w) || isNaN(h)) return;
    if (gridSizeLinked.value) h = w;
    grid.value = produce(grid.value, (g) => {
      g.width = Math.max(5, w);
      g.height = Math.max(5, h);
    });
  }

  return (
    <div id='tool-grid' className='p-2 panel'>
      <h4>Grid</h4>
      <div className='d-flex align-items-center'>
        <FormLabel className='flex-grow-1 mb-0 me-1'>Size</FormLabel>
        <>
          <InputNumber value={grid.value.width} onChange={(e) => changeSize(e.target.value, grid.value.height)} htmlSize='1' />
          {!gridSizeLinked.value && (
            <>
              <i class='bi bi-x'></i>
              <InputNumber
                value={grid.value.height}
                onChange={(e) => changeSize(grid.value.width, e.target.value)}
                htmlSize='1'
              />
            </>
          )}
        </>
        <Button size='sm' className='ms-1 px-0' variant={gridSizeLinked.value ? "primary" : "secondary"} onClick={toggleLinked}>
          <i class='bi bi-link rotate-90'></i>
        </Button>
      </div>
      <div className='mt-3 d-flex align-items-center'>
        <FormLabel className='flex-grow-1 mb-0 me-1'>Offset</FormLabel>
        <FormLabel className='mb-0 me-1'>x:</FormLabel>
        <InputNumber value={grid.value.offsetX} onChange={(e) => changeOffset(e.target.value, grid.value.offsetY)} htmlSize='1' />
        <FormLabel className='mb-0 mx-1'>y:</FormLabel>
        <InputNumber value={grid.value.offsetY} onChange={(e) => changeOffset(grid.value.offsetX, e.target.value)} htmlSize='1' />
      </div>
      {showHelpTextDefault.value && (
        <div className='tool-help-text'>
          <ul>
            <li>Focus a number field and use mouse wheel or cursor up / down to adjust the value.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
