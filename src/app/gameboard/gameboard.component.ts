import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameboardService } from '../gameboard.service'

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  @ViewChild('backgroundlayer') backgroundCanvas: ElementRef;
  @ViewChild('gridlayer') gridCanvas: ElementRef;
  public bCanvas: HTMLCanvasElement
  public gCanvas: HTMLCanvasElement
  public backgroundContext: CanvasRenderingContext2D;
  public gridContext: CanvasRenderingContext2D;
  background: HTMLImageElement
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 25;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 50;
  vertical = false;

  constructor(private gameboardService: GameboardService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let that = this
    this.gCanvas = (<HTMLCanvasElement>this.gridCanvas.nativeElement)
    this.gridContext = (<HTMLCanvasElement>this.gridCanvas.nativeElement).getContext('2d');
    this.bCanvas = (<HTMLCanvasElement>this.backgroundCanvas.nativeElement)
    this.backgroundContext = (<HTMLCanvasElement>this.backgroundCanvas.nativeElement).getContext('2d');

    var background = new Image();
    background.src = "assets/images/backgrounds/1.jpg";

    background.onload = function () {
      that.backgroundContext.canvas.height = background.height
      that.backgroundContext.canvas.width = background.width
      that.gridContext.canvas.height = background.height
      that.gridContext.canvas.width = background.width
      that.backgroundContext.drawImage(background, 0, 0);
      that.gameboardService.drawGrid(100, that.gridContext, that.gCanvas)
    }
  }

  onChange() {
    console.log('redrawing with value: ' + this.value)
    this.gameboardService.redrawGrid(this.value, this.gridContext, this.gCanvas)
  }
}








// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { GameboardService } from '../gameboard.service'

// @Component({
//   selector: 'app-gameboard',
//   templateUrl: './gameboard.component.html',
//   styleUrls: ['./gameboard.component.css']
// })
// export class GameboardComponent implements OnInit {
//   @ViewChild('gameboardCanvas') gameboardCanvas: ElementRef;
//   public context: CanvasRenderingContext2D;
//   public canvas: HTMLCanvasElement;
//   background: HTMLImageElement
//   constructor(private gameboardService: GameboardService) { }

//   ngOnInit() {
//   }

//   ngAfterViewInit(): void {
//     let that = this
//     this.canvas = (<HTMLCanvasElement>this.gameboardCanvas.nativeElement)
//     this.context = (<HTMLCanvasElement>this.gameboardCanvas.nativeElement).getContext('2d');

//     var background = new Image();
//     background.src = "assets/images/backgrounds/1.jpg";

//     background.onload = function () {
//       that.canvas.style.background = "assets/images/backgrounds/1.jpg"
//       that.context.canvas.height = background.height
//       that.context.canvas.width = background.width
//       that.context.drawImage(background, 0, 0);
//       that.gameboardService.drawGrid(100, that.context, that.canvas)
//     }
//   }
// }

