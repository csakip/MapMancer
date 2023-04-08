import { effect, signal } from "@preact/signals-core";
import localforage from "localforage";

// Get settings from storage
localforage.getItem("mapmancer-settings").then((data) => {
  if (!data) return;
  theme.value = data.theme;
});

export const theme = signal("light");

// Save every change to storage
effect(() => {
  const data = {
    theme: theme.value,
  };
  localforage.setItem("mapmancer-settings", data);
});

// Set theme
effect(() => {
  document.documentElement.setAttribute("data-bs-theme", theme.value);
});
