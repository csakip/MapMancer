import { useSignal, useSignalEffect } from "@preact/signals";
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toolHelpText } from "../State";
import GridUI from "./GridUI";
import { useRef } from "preact/hooks";
import SettingsUI from "./SettingsUI";

export default function UiComponent(props) {
  const toolsOpen = useRef({ grid: useSignal(false), settings: useSignal(false) });

  function ToolbarButton({ name, icon, toolTip, onClick }) {
    return (
      <Button
        onClick={(e) => {
          if (onClick) onClick(e);
          else toolsOpen.current[name].value = !toolsOpen.current[name].value;
        }}
        className={toolsOpen.current[name]?.value ? "active" : ""}
        onMouseOver={() => (toolHelpText.value = toolTip)}>
        <i class={`bi ${icon}`}></i>
      </Button>
    );
  }

  return (
    <>
      <div className='top-left'>
        <div id='toolbar' className='d-inline-block align-top'>
          <ButtonGroup vertical onMouseOut={() => (toolHelpText.value = null)}>
            <ToolbarButton name='grid' icon='bi-grid-3x3' toolTip='Grid' />
            <ToolbarButton name='settings' icon='bi-gear' toolTip='Settings' />
          </ButtonGroup>
        </div>
        <div id='tool' className='d-inline-block align-top'>
          {toolsOpen.current.grid.value && <GridUI />}
          {toolsOpen.current.settings.value && <SettingsUI />}
        </div>
      </div>
      {toolHelpText.value && (
        <div className='bottom-left'>
          <div className='panel px-3 py-1'>{toolHelpText.value}</div>
        </div>
      )}
    </>
  );
}
