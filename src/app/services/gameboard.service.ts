import { Injectable, ElementRef } from "@angular/core"

@Injectable({
  providedIn: "root"
})
export class GameboardService {
  public gCanvasRef: ElementRef
  public gridCanvas: HTMLCanvasElement
  public gridContext: CanvasRenderingContext2D
  public gridPositionX: number = 0
  public gridPositionY: number = 0

  public bCanvasRef: ElementRef
  public backgroundCanvas: HTMLCanvasElement
  public backgroundContext: CanvasRenderingContext2D

  background: HTMLImageElement

  canvasZoom: number = 1

  gridSize: number = 50
  zoomLevel: number = 1

  backgroundOriginalWidth: number
  backgroundOriginalHeight: number

  constructor() { }

  setCanvases(gridCanvas: ElementRef, backgroundCanvas: ElementRef) {
    this.bCanvasRef = backgroundCanvas
    this.backgroundCanvas = <HTMLCanvasElement>this.bCanvasRef.nativeElement
    this.gCanvasRef = gridCanvas
    this.gridCanvas = <HTMLCanvasElement>this.gCanvasRef.nativeElement
  }

  initCanvases() {
    this.gridContext = this.gridCanvas.getContext("2d")
    this.backgroundContext = this.backgroundCanvas.getContext("2d")
    this.setBackgroundImage("assets/images/backgrounds/1.jpg")
  }

  setBackgroundImage(src: string) {
    let that = this
    this.background = new Image()
    this.background.src = src

    this.background.onload = function () {
      that.backgroundContext.canvas.height = that.background.height
      that.backgroundContext.canvas.width = that.background.width
      that.gridContext.canvas.height = that.background.height
      that.gridContext.canvas.width = that.background.width
      that.backgroundContext.drawImage(that.background, 0, 0)
      that.drawGrid()
      that.backgroundOriginalWidth = that.background.width
      that.backgroundOriginalHeight = that.background.height
    }
  }

  changeGridSize(newGridsize: number, gridPositionX: number, gridPositionY: number) {
    this.gridSize = newGridsize
    this.gridPositionX = gridPositionX
    this.gridPositionY = gridPositionY
    this.redrawGrid()
  }

  redrawGrid() {
    console.log("redrawing grid")
    this.gridContext.clearRect(
      0,
      0,
      this.gridContext.canvas.width,
      this.gridContext.canvas.height
    )
    this.gridContext.beginPath()
    this.drawGrid()
  }

  redrawCanvases() {
    this.redrawGrid()

    this.backgroundContext.drawImage(this.background, 0, 0)
  }
  clearCanvases() {
    this.backgroundContext.clearRect(0, 0, this.backgroundContext.canvas.width, this.backgroundContext.canvas.height)
    this.gridContext.clearRect(0, 0, this.gridContext.canvas.width, this.gridContext.canvas.height)
  }

  zoom(bool: boolean) {
    var counter = 1
    let that = this
    var id = setInterval(frame, 40)


    function frame() {
      counter++
      that.clearCanvases()

      that.backgroundContext.canvas.height = that.backgroundOriginalHeight
      that.backgroundContext.canvas.width = that.backgroundOriginalWidth
      that.gridContext.canvas.height = that.backgroundOriginalHeight
      that.gridContext.canvas.width = that.backgroundOriginalWidth
      that.gridContext.scale(1 / that.zoomLevel, 1 / that.zoomLevel)
      that.backgroundContext.scale(1 / that.zoomLevel, 1 / that.zoomLevel)
      if (bool) {
        that.zoomLevel = that.zoomLevel + 0.01
      } else {
        that.zoomLevel = that.zoomLevel - 0.01
      }

      that.zoomLevel = Math.round(that.zoomLevel * 1000) / 1000

      that.backgroundContext.canvas.height = that.backgroundContext.canvas.height * that.zoomLevel
      that.backgroundContext.canvas.width = that.backgroundContext.canvas.width * that.zoomLevel
      that.gridContext.canvas.height = that.gridContext.canvas.height * that.zoomLevel
      that.gridContext.canvas.width = that.gridContext.canvas.width * that.zoomLevel
      that.gridContext.scale(that.zoomLevel, that.zoomLevel)
      that.backgroundContext.scale(that.zoomLevel, that.zoomLevel)
      that.redrawCanvases()
      if (counter === 15) {
        console.log(that.zoomLevel)
        clearInterval(id)
      }
    }
  }

  drawGrid() {
    //grid width and height
    var bw = (this.gridCanvas.width * 1) / this.zoomLevel
    var bh = (this.gridCanvas.height * 1) / this.zoomLevel

    //padding around grid
    var p = 0

    var ctx = this.gridContext
    for (var x = this.gridPositionX; x <= bw; x += this.gridSize) {
      ctx.moveTo(0.5 + x + p, p)
      ctx.lineTo(0.5 + x + p, bh + p)
    }

    for (var x = this.gridPositionY; x <= bh; x += this.gridSize) {
      ctx.moveTo(p, 0.5 + x + p)
      ctx.lineTo(bw + p, 0.5 + x + p)
    }

    ctx.strokeStyle = "black"
    ctx.stroke()
  }

  getGridSize() {
    return this.gridSize
  }
}
