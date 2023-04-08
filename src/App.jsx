import { Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { count, theme } from "./State";

function App() {
  return (
    <div className='prevent-select' data-bs-theme='dark'>
      <h1>MapMancer</h1>
      <div>
        <Button onClick={() => count.value++}>count is {count}</Button>
      </div>
      <div className='mt-3'>
        <Button onClick={() => (theme.value = theme.value === "light" ? "dark" : "light")}>theme</Button>
      </div>
    </div>
  );
}

export default App;
