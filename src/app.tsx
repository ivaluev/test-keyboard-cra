import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { useKeyMonitor } from "./hooks/useKeyMonitor"
import { useCanvasSizeAdjuster } from './hooks/useCanvasSizeAdjuster' 
import { canvasClear, canvasPrint } from './utils/canvasUtils'
import { KEY_CODE_SHIFT, KEY_CODE_CTRL, KEY_CODE_ALT } from './constants'

// DISCLAIMER
// no tests have been added due to time shortage
// logic errors branches have not been processed as well to keep example simple

function prepareKeyString(key: string, modifiers: number[]) {
  let result = key // if we indeed need lower case for Ctrl+Shift+a - can set it here

  if (modifiers.includes(KEY_CODE_SHIFT)) {
    result = modifiers.includes(KEY_CODE_CTRL) 
      ? `Ctrl+Shift+${result}` 
      : result
  } 

  if (modifiers.includes(KEY_CODE_ALT) && key === "1") {
    result = "\u263a";
  }

  return result;
}

export default function App() {
  const ref = useRef<HTMLCanvasElement>(null)
  const { keyScope } = useKeyMonitor()
  const { width, height } = useCanvasSizeAdjuster(ref)

  useEffect(() => {
    canvasPrint(ref.current, 
      prepareKeyString(keyScope?.key || 'x', keyScope?.modifiers || []));
  }, [keyScope, width, height]);

  return (
    <>
      <ControlsDiv>
        <ClearButton onClick={() => canvasClear(ref.current)}>
          Clear
        </ClearButton>
      </ControlsDiv>
      <ResultCanvas ref={ref} width={width} height={height} />
    </>
  );
}

const ControlsDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const ClearButton = styled.button`
  background: black;
  color: white;
  border: 1px solid white;
  margin-right: 10px;
  margin-top: 10px;
  height: 25px;
  width: 60px;
  &:hover {
    cursor: pointer;
  }
`;

const ResultCanvas = styled.canvas`
  display: block;
  width: 100vw;
  height: 100vh;
`;
