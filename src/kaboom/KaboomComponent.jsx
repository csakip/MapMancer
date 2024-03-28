import "./../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef } from "preact/hooks";
import "c:/Code/kaboom/dist/kaboom.js";
import { init } from "./main.js";

/**
 * Initializes a Kaboom game component.
 */
export default function KaboomComponent(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const k = kaboom({
      global: false,
      canvas: canvasRef.current,
      background: [0, 0, 50],
      texFilter: "linear",
    });

    init(k);
  }, []);
  return (
    <div id='canvas-container'>
      {props.children}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
