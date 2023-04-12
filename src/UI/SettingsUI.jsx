import { Button, FormCheck, FormLabel } from "react-bootstrap";
import { showHelpTextDefault, theme } from "../State";

export default function SettingsUI() {
  return (
    <div id='tool-settings' className='p-2 panel'>
      <h4>Settings</h4>
      <div className='d-flex align-items-center'>
        <FormLabel className='flex-grow-1 mb-0 me-2'>Change theme</FormLabel>

        <Button onClick={() => (theme.value = theme.value === "light" ? "dark" : "light")}>
          {theme.value === "light" ? <i className='bi bi-moon' /> : <i className='bi bi-sun' />}
        </Button>
      </div>
      <div className='d-flex align-items-center mt-1'>
        <FormLabel className='flex-grow-1 mb-0 me-2'>Show tool help texts</FormLabel>
        <FormCheck
          className='text-end'
          type='switch'
          checked={showHelpTextDefault.value}
          onClick={() => (showHelpTextDefault.value = !showHelpTextDefault.value)}
        />
      </div>
    </div>
  );
}
