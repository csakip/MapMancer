import App from "./App";
import { render } from "preact";
import { theme } from "./State";
import { effect } from "@preact/signals";

// Disable Tauri's context menu
if (window.__TAURI__) document.addEventListener("contextmenu", (event) => event.preventDefault());

// Set theme on the HTML tag
effect(() => {
  document.documentElement.setAttribute("data-bs-theme", theme.value);
});

render(<App />, document.getElementById("root"));
