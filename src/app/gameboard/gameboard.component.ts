import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameboardService } from '../gameboard.service'

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  @ViewChild('gameboardCanvas') gameboardCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  constructor(private gameboardService: GameboardService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let that = this
    this.canvas = (<HTMLCanvasElement>this.gameboardCanvas.nativeElement)
    this.context = (<HTMLCanvasElement>this.gameboardCanvas.nativeElement).getContext('2d');

    var background = this.gameboardService.setBackgroundImage("assets/images/backgrounds/1.jpg")
    background.onload = function () {
      that.context.canvas.height = background.height
      that.context.canvas.width = background.width
      that.context.drawImage(background, 0, 0);
      that.gameboardService.drawGrid(100, that.context, that.canvas)
    }
  }
}
