import { Form } from "react-bootstrap";

export default function InputNumber({ value, onChange, htmlSize, allowDecimals = false, step, max, min }) {
  const arrowsKeyCodes = [37, 38, 39, 40];
  const numPadNumberKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
  const dots = [110, 190];
  const tabBackDel = [8, 9, 46, 115];
  const acv = [65, 67, 86, 82];

  function keyDown(e) {
    // Allow only [0-9] number, numpad number, arrow, BackSpace, Tab, Del
    // Ctrl + C, Ctrl + V, Ctrl + A, Ctrl + R, F5
    if (
      ((e.keyCode < 48 && arrowsKeyCodes.indexOf(e.keyCode) === -1) ||
        (e.keyCode > 57 &&
          numPadNumberKeyCodes.indexOf(e.keyCode) === -1 &&
          (!allowDecimals || dots.indexOf(e.keyCode) === -1))) &&
      tabBackDel.indexOf(e.keyCode) === -1 &&
      (e.ctrlKey === false || (e.ctrlKey === true && acv.indexOf(e.keyCode) === -1))
    ) {
      e.preventDefault();
    }
  }

  return (
    <Form.Control
      className='input-number-drag'
      type='number'
      value={value.toString()}
      onChange={onChange}
      size='sm'
      htmlSize={htmlSize}
      onKeyDown={keyDown}
      step={step}
      max={max}
      min={min}
    />
  );
}
