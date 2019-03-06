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

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  rightClickedElement: HTMLElement;

  constructor(
    private gameboardService: GameboardService,
    private objectsService: ObjectsService
  ) {}

  ngAfterViewInit(): void {
    this.gameboardService.setCanvases(this.gridCanvas, this.backgroundCanvas);
    this.gameboardService.initCanvases();
    this.objectsService.setStage(this.stage, this.draggableImg);
  }

  //activates the menu with the coordinates
  onrightClick(event) {
    let element: HTMLElement = event.target;
    if (element.classList.contains("rotateable")) {
      this.contextmenuX = event.clientX;
      this.contextmenuY = event.clienty;
      this.rightClickedElement = element;
      this.contextmenu = true;
    }
  }

  //disables the menu
  disableContextMenu() {
    this.contextmenu = false;
    this.rightClickedElement = null;
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

  // @HostListener('document:contextmenu', ['$event'])
  // onClick(e) {
  //   console.log(e.target)
  //   let element: HTMLElement = e.target
  //   if (element.classList.contains('rotateable')) {
  //     this.objectsService.rotateElementBy45(e.target);
  //   }

  //   return false
  // }
}
