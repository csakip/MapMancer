import { Button } from "react-bootstrap";

export default function BackgroundUI() {
  // Opens a Tauri file dialog and loads the selected image
  function loadBackground() {}

  return (
    <div id='tool-grid' className='p-2 panel'>
      <h4>Background</h4>
      <div className='d-flex align-items-center my-1'>
        <Button onClick={loadBackground} variant='primary' size='sm' className='w-100'>
          Load Background
        </Button>
      </div>
    </div>
  );
}
