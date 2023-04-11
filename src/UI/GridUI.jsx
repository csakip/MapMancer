import { useSignal } from "@preact/signals";
import produce from "immer";
import { Button, ButtonGroup, FormLabel } from "react-bootstrap";
import { grid } from "../State";

export default function GridUI() {
  const gridSettingsOpen = useSignal(true);
  const gridSizeLinked = useSignal(true);

  function offset(x, y) {
    grid.value = produce(grid.value, (g) => {
      g.offsetX += x;
      if (g.offsetX < 0) g.offsetX += g.width;
      if (g.offsetX > g.width) g.offsetX -= g.width;
      g.offsetY += y;
      if (g.offsetY < 0) g.offsetY += g.height;
      if (g.offsetY > g.height) g.offsetY -= g.height;
    });
  }

  function expand(w, h) {
    grid.value = produce(grid.value, (g) => {
      if (g.width > 5) g.width += w;
      if (g.height > 5) g.height += h;
    });
  }

  function toggleLinked() {
    gridSizeLinked.value = !gridSizeLinked.value;
    if (gridSizeLinked.value)
      grid.value = produce(grid.value, (g) => {
        g.height = g.width;
      });
  }

  const sizeLabel = gridSizeLinked.value ? `(${grid.value.width})` : `(${grid.value.width} x ${grid.value.height})`;
  const offsetLabel = `(${grid.value.offsetX} x ${grid.value.offsetY})`;

  return (
    <>
      <Button onClick={() => (gridSettingsOpen.value = !gridSettingsOpen.value)}>Grid Settings</Button>
      {gridSettingsOpen.value && (
        <>
          <div className='mt-3 d-flex align-items-center'>
            <FormLabel className='flex-grow-1 mb-0 me-1'>Size {sizeLabel}</FormLabel>
            {!gridSizeLinked.value && (
              <>
                <ButtonGroup size='sm'>
                  <Button
                    onClick={() => {
                      expand(-1, 0);
                    }}>
                    <i class='bi bi-arrows-expand rotate-90'></i>
                  </Button>
                  <Button
                    onClick={() => {
                      expand(1, 0);
                    }}>
                    <i class='bi bi-arrows-collapse rotate-90'></i>
                  </Button>
                </ButtonGroup>
                <ButtonGroup size='sm' className='ms-1'>
                  <Button
                    onClick={() => {
                      expand(0, -1);
                    }}>
                    <i class='bi bi-arrows-expand'></i>
                  </Button>
                  <Button
                    onClick={() => {
                      expand(0, 1);
                    }}>
                    <i class='bi bi-arrows-collapse'></i>
                  </Button>
                </ButtonGroup>
              </>
            )}
            {gridSizeLinked.value && (
              <ButtonGroup size='sm'>
                <Button
                  onClick={() => {
                    expand(-1, -1);
                  }}>
                  <i class='bi bi-arrows-expand rotate-45'></i>
                </Button>
                <Button
                  onClick={() => {
                    expand(1, 1);
                  }}>
                  <i class='bi bi-arrows-collapse rotate-45'></i>
                </Button>
              </ButtonGroup>
            )}
            <Button size='sm' className='ms-1 px-0' variant={gridSizeLinked.value ? "primary" : "secondary"} onClick={toggleLinked}>
              <i class='bi bi-link rotate-90'></i>
            </Button>
          </div>
          <div className='mt-3 d-flex align-items-center'>
            <FormLabel className='flex-grow-1 mb-0 me-1'>Offset {offsetLabel}</FormLabel>
            <ButtonGroup size='sm'>
              <Button
                onClick={() => {
                  offset(-1, 0);
                }}>
                <i class='bi bi-arrow-left'></i>
              </Button>
              <Button
                onClick={() => {
                  offset(1, 0);
                }}>
                <i class='bi bi-arrow-right'></i>
              </Button>
              <Button
                onClick={() => {
                  offset(0, -1);
                }}>
                <i class='bi bi-arrow-up'></i>
              </Button>
              <Button
                onClick={() => {
                  offset(0, 1);
                }}>
                <i class='bi bi-arrow-down'></i>
              </Button>
            </ButtonGroup>
          </div>
        </>
      )}
    </>
  );
}
