import { effect, signal } from "@preact/signals";
import localforage from "localforage";

// Get settings from storage
const data = await localforage.getItem("mapmancer-settings");

// Create state objects with stored data or defaults
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
