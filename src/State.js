import { effect, signal } from "@preact/signals";
import localforage from "localforage";

// Get settings from storage
const data = await localforage.getItem("mapmancer-settings");

// Create state objects with stored data or defaults
export const theme = signal(data?.theme || "dark");
export const showHelpTextDefault = signal(data?.showHelpTextDefault !== undefined ? data.showHelpTextDefault : true);
console.log(data?.showHelpTextDefault);

export const toolHelpText = signal(null);

export const grid = signal(
  data?.grid || {
    offsetX: 0,
    offsetY: 0,
    width: 50,
    height: 50,
    color: "#00000088",
    type: "rectangle",
    snap: false,
    measurement: "Euclidean",
    enabled: true,
  }
);

// Save every change to storage
effect(() => {
  const data = {
    theme: theme.value,
    showHelpTextDefault: showHelpTextDefault.value,
  };
  localforage.setItem("mapmancer-settings", data);
});
