import { Button, FormLabel } from "react-bootstrap";
import { theme } from "../State";

export default function SettingsUI() {
  return (
    <div className='p-2 panel'>
      <h4>Settings</h4>
      <div className='d-flex align-items-center'>
        <FormLabel className='flex-grow-1 mb-0 me-1'>Change theme</FormLabel>

        <Button onClick={() => (theme.value = theme.value === "light" ? "dark" : "light")}>{theme.value === "light" ? "Dark" : "Light"}</Button>
      </div>
    </div>
  );
}
