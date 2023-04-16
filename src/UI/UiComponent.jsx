import { useSignal, useSignalEffect } from "@preact/signals";
import { useRef } from "preact/hooks";
import { Button, ButtonGroup } from "react-bootstrap";
import { multipleToolsOpen, toolHelpText } from "../State";
import GridUI from "./GridUI";
import SettingsUI from "./SettingsUI";
import BackgroundUI from "./BackgroundUI";

export default function UiComponent(props) {
  const toolsOpen = useRef({ grid: useSignal(false), settings: useSignal(false), background: useSignal(false) });

  useSignalEffect(() => {
    const moreThanOneToolOpen = Object.values(toolsOpen.current).filter((state) => state.peek()).length > 1;
    if (!multipleToolsOpen.value && moreThanOneToolOpen) closeAllTools();
  });

  function closeAllTools() {
    Object.keys(toolsOpen.current).forEach((key) => {
      toolsOpen.current[key].value = false;
    });
  }

  function toggleTool(name) {
    toolsOpen.current[name].value = !toolsOpen.current[name].value;
    if (!multipleToolsOpen.value) {
      Object.keys(toolsOpen.current).forEach((key) => {
        if (key !== name) toolsOpen.current[key].value = false;
      });
    }
  }

  function ToolbarButton({ name, icon, toolTip, onClick }) {
    return (
      <Button
        onClick={(e) => {
          if (onClick) onClick(e);
          else toggleTool(name);
        }}
        className={toolsOpen.current[name]?.value ? "active" : ""}
        onMouseOver={() => (toolHelpText.value = toolTip)}>
        <i class={`bi ${icon}`}></i>
      </Button>
    );
  }

  function TinyButton({ icon, toolTip, onClick, state }) {
    return (
      <Button
        size='sm'
        onClick={(e) => {
          if (onClick) onClick(e);
          else state.value = !state.value;
        }}
        className={state?.value ? "tiny-button active" : "tiny-button"}
        onMouseOver={() => (toolHelpText.value = toolTip)}>
        <i class={`bi ${icon}`}></i>
      </Button>
    );
  }

  return (
    <>
      <div className='top-left'>
        <div id='toolbar' className='d-inline-block align-top flex-1'>
          <ButtonGroup vertical onMouseOut={() => (toolHelpText.value = null)}>
            <div className='d-flex flex-row w-100'>
              <TinyButton icon='bi-x-lg' toolTip='Close all panels' onClick={closeAllTools} />
              <TinyButton icon='bi-bookshelf' toolTip='Multiple panels can be open at once' state={multipleToolsOpen} />
            </div>
            <ToolbarButton name='background' icon='bi-image' toolTip='Background' />
            <ToolbarButton name='grid' icon='bi-grid-3x3' toolTip='Grid' />
            <ToolbarButton name='settings' icon='bi-gear' toolTip='Settings' />
          </ButtonGroup>
        </div>
        <div id='tool' className='d-inline-block align-top hide-scrollbar'>
          {toolsOpen.current.background.value && <BackgroundUI />}
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
