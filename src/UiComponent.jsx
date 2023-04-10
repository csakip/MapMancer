import { Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { count, theme } from "./State";

export default function UiComponent(props) {
  return (
    <div className='top-left'>
      <h3>MapMancer {import.meta.env.VITE_APP_VERSION}</h3>
      <div>
        <Button onClick={() => count.value++} variant='secondary' size='sm'>
          count is {count}
        </Button>
      </div>
      <div className='mt-3'>
        <Button onClick={() => (theme.value = theme.value === "light" ? "dark" : "light")}>theme</Button>
      </div>
    </div>
  );
}
