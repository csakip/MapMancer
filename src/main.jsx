import App from "./App";
import { render } from "preact";

if (window.__TAURI__) document.addEventListener("contextmenu", (event) => event.preventDefault());

render(<App />, document.getElementById("root"));
