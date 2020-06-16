export function canvasClear(canvas: HTMLCanvasElement | null) {
  if (canvas) {
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function canvasPrint(canvas: HTMLCanvasElement | null, key: string) {
  if (canvas) {
    canvasClear(canvas);
    const ctx = canvas.getContext("2d");
    if (ctx != null) {
      ctx.font = "100px Verdana";
      const text = key;
      const textWidth = ctx.measureText(text).width;
      const textStartX = canvas.width / 2 - textWidth / 2;
      const textEndX = canvas.width / 2 + textWidth / 2;
      const gradient = ctx.createLinearGradient(textStartX, 0, textEndX, 0);
      gradient.addColorStop(0, "magenta");
      gradient.addColorStop(0.5, "blue");
      gradient.addColorStop(1.0, "red");

      ctx.fillStyle = gradient;
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2); //, canvas.width/2, canvas.height/2
    }
  }
}
