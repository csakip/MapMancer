import { Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { count, theme } from "./State";

function App() {
  return (
    <div className='App' data-bs-theme='dark'>
      <h1>MapMancer</h1>
      <div>
        <Button onClick={() => count.value++}>count is {count}</Button>
      </div>
      <div>
        <Button onClick={() => (theme.value = theme.value === "light" ? "dark" : "light")}>them</Button>
      </div>
    </div>
  );
}

export default App;
