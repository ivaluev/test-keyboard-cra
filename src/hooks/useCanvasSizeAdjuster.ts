import { useState, useEffect } from "react";
import { fromEvent, timer } from "rxjs";
import { debounce, startWith } from "rxjs/operators";

export class CanvasSize {
  constructor(public width: number, public height: number) {}
}

export function useCanvasSizeAdjuster(ref: React.RefObject<HTMLCanvasElement>): CanvasSize {
  const [canvasSize, setCanvasSize] = 
    useState<CanvasSize>(new CanvasSize(window.innerWidth, window.innerHeight))

  useEffect(() => {
    const resizeStream = fromEvent<UIEvent>(window, "resize")
      .pipe(
        debounce(() => timer(1000)),
        startWith({})
      )
      .subscribe(e => {
        console.log("resized")
        if (ref.current) {
          const cbox = ref.current.getBoundingClientRect()
          setCanvasSize(new CanvasSize(cbox.width, cbox.height))
        }
      });

    return () => resizeStream.unsubscribe()
  }, [ref])

  return canvasSize
}