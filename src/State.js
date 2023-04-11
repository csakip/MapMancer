import { effect, signal } from "@preact/signals";
import localforage from "localforage";

// Get settings from storage
const data = await localforage.getItem("mapmancer-settings");

// Create state objects with stored data or defaults
export const theme = signal(data?.theme || "light");
export const count = signal(data?.count || 0);
export const grid = signal(
  data?.grid || {
    offsetX: 0,
    offsetY: 0,
    width: 50,
    height: 50,
    color: "#fff",
    alpha: 0.5,
    type: "rectangle",
    snap: false,
    measurement: "Euclidean",
    draw: true,
  }
);

// Save every change to storage
effect(() => {
  const data = {
    theme: theme.value,
    count: count.value,
  };
  localforage.setItem("mapmancer-settings", data);
});
