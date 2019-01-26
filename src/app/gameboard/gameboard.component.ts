import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";
import { GameboardService } from "../services/gameboard.service";
import { ObjectsService } from "../services/objects.service";

@Component({
  selector: "app-gameboard",
  templateUrl: "./gameboard.component.html",
  styleUrls: ["./gameboard.component.css"]
})
export class GameboardComponent {
  // grid canvas
  @ViewChild("stage") stage: ElementRef;
  @ViewChild("draggableImg") draggableImg: ElementRef;
  // background canvas
  @ViewChild("backgroundlayer") backgroundCanvas: ElementRef;

  // grid canvas
  @ViewChild("gridlayer") gridCanvas: ElementRef;

  constructor(
    private gameboardService: GameboardService,
    private objectsService: ObjectsService
  ) { }

  ngAfterViewInit(): void {
    this.gameboardService.setCanvases(this.gridCanvas, this.backgroundCanvas);
    this.gameboardService.initCanvases();
    this.objectsService.setStage(this.stage, this.draggableImg);
  }

  @HostListener("document:keydown", ["$event"])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    console.log("key");
    if (event.key === "+") {
      console.log("plus");
      this.gameboardService.zoom(true);
    } else if (event.key === "-") {
      this.gameboardService.zoom(false);
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  onClick(e) {
    console.log(e.target)
    let element: HTMLElement = e.target
    if (element.classList.contains('rotateable')) {
      this.objectsService.rotateElement(e.target)
    }

    return false
  }

}
