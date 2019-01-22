import { Injectable, AfterViewInit, ElementRef } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GameboardService {
  public gCanvasRef: ElementRef
  public gridCanvas: HTMLCanvasElement
  public gridContext: CanvasRenderingContext2D;

  public bCanvasRef: ElementRef
  public backgroundCanvas: HTMLCanvasElement
  public backgroundContext: CanvasRenderingContext2D;

  background: HTMLImageElement

  canvasZoom: number = 1

  gridSize: number = 50

  constructor() { }

  setCanvases(gridCanvas: ElementRef, backgroundCanvas: ElementRef) {
    this.bCanvasRef = backgroundCanvas
    this.backgroundCanvas = (<HTMLCanvasElement>this.bCanvasRef.nativeElement)
    this.gCanvasRef = gridCanvas
    this.gridCanvas = (<HTMLCanvasElement>this.gCanvasRef.nativeElement)
  }

  initCanvases() {
    let that = this
    this.gridContext = this.gridCanvas.getContext('2d');
    this.backgroundContext = this.backgroundCanvas.getContext('2d');

    this.background = new Image();
    this.background.src = "assets/images/backgrounds/1.jpg";

    this.background.onload = function () {
      that.backgroundContext.canvas.height = that.background.height
      that.backgroundContext.canvas.width = that.background.width
      that.gridContext.canvas.height = that.background.height
      that.gridContext.canvas.width = that.background.width
      that.backgroundContext.drawImage(that.background, 0, 0);
      that.drawGrid(that.gridSize, that.gridContext, that.gridCanvas, 0, 0)
    }
  }

  changeGridSize(newGridsize: number, gridPositionX: number, gridPositionY: number) {
    this.gridSize = newGridsize
    this.redrawGrid(this.gridSize, this.gridContext, this.gridCanvas, gridPositionX, gridPositionY)
  }

  redrawGrid(gridwidth: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, gridPositionX: number, gridPositionY: number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()
    this.drawGrid(gridwidth, ctx, canvas, gridPositionX, gridPositionY)
  }

  drawGrid(gridwidth: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, gridPositionX: number, gridPositionY: number) {

    var dx = gridwidth;
    var dy = gridwidth;

    var x = gridPositionX;
    var y = gridPositionY;
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
}
