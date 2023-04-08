import { effect, signal } from "@preact/signals";
import localforage from "localforage";

// Get settings from storage
const data = await localforage.getItem("mapmancer-settings");

export const theme = signal(data?.theme || "light");
export const count = signal(data?.count || 0);

// Save every change to storage
effect(() => {
  const data = {
    theme: theme.value,
    count: count.value,
  };
  localforage.setItem("mapmancer-settings", data);
});

// Set theme
effect(() => {
  document.documentElement.setAttribute("data-bs-theme", theme.value);
});
