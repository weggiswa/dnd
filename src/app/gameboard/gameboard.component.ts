import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GameboardService } from '../gameboard.service'

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent {

  // background canvas
  @ViewChild('backgroundlayer') backgroundCanvas: ElementRef;
  public bCanvas: HTMLCanvasElement

  // grid canvas
  @ViewChild('gridlayer') gridCanvas: ElementRef;
  public gCanvas: HTMLCanvasElement

  constructor(private gameboardService: GameboardService) { }


  ngAfterViewInit(): void {

    this.gCanvas = (<HTMLCanvasElement>this.gridCanvas.nativeElement)
    this.bCanvas = (<HTMLCanvasElement>this.backgroundCanvas.nativeElement)
    this.gameboardService.setCanvases(this.gridCanvas, this.backgroundCanvas)
    this.gameboardService.initCanvases()
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    console.log('key')
    if (event.key === '+') {
      console.log('plus')

    } else
      if (event.key === '-') {

      }
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

