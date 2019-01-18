import { Injectable } from '@angular/core';
import { Object } from './object.interface'

@Injectable({
  providedIn: 'root'
})
export class GameboardService {

  constructor() { }

  redrawGrid(gridwidth: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()
    this.drawGrid(gridwidth, ctx, canvas)
  }

  drawGrid(gridwidth: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    var dx = gridwidth;
    var dy = gridwidth;

    var x = -75;
    var y = -70;
    var w = canvas.width;
    var h = canvas.height;

    ctx.lineWidth = 1;

    while (y < h) {
      y = y + dy;
      ctx.moveTo(x, y);
      ctx.lineTo(w, y);
      ctx.stroke();

    }

    y = 0;
    while (x < w) {
      x = x + dx;
      ctx.moveTo(x, y);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
  }

  addObject(obj: Object, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, xPos: number, yPos: number, gridwidth: number) {

  }


}
