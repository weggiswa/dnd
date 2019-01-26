import { Component, HostListener, OnInit } from "@angular/core";
import { GameboardService } from "../services/gameboard.service";
import { ObjectsService } from "../services/objects.service";
import { UtilsService } from "../services/utils.service";
import { Result, ObjectsProperties, Object } from "../object.interface";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  numberOfBackgrounds: number;
  numberOfObjects: number;
  objects: Result;


  ngOnInit(): void {
    this.objects = this.objectsService.getObjectsInfo();
    console.log(this.objects);
  }
  opened: boolean = false;

  //  grid size mat-slider options
  gridSizeMax = 100;
  gridSizeMin = 25;
  gridSizeStep = 1;
  gridSizeValue = 50;
  gridSizeDisabled = false;

  //  grid position options
  gridPositionX = 0;
  gridPositionY = 0;

  constructor(
    private gameboardService: GameboardService,
    private objectsService: ObjectsService,
    private utilsService: UtilsService
  ) { }

  private toggleSideNav() {
    this.opened = !this.opened;
  }

  @HostListener("document:keydown", ["$event"])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === "m") {
      this.toggleSideNav();
    }
    event.stopPropagation();
  }

  gridValueOnChange() {
    if (
      this.gridSizeValue >= this.gridSizeMin &&
      this.gridSizeValue <= this.gridSizeMax
    ) {
      console.log("redrawing with value: " + this.gridSizeValue);
      this.gameboardService.changeGridSize(
        this.gridSizeValue,
        this.gridPositionX,
        this.gridPositionY
      );
    } else {
      this.gridSizeValue = this.utilsService.clamp(
        this.gridSizeValue,
        this.gridSizeMin,
        this.gridSizeMax
      );
    }
  }

  gridPositionOnChange() {
    this.gameboardService.changeGridSize(
      this.gridSizeValue,
      this.gridPositionX,
      this.gridPositionY
    );
  }

  buttonMenuToggle() {
    this.toggleSideNav();
  }

  addImageToCanvas(object: Object) {
    this.objectsService.addImageToStage(object)
  }

  setCanvasBackground(object: Object) {
    this.gameboardService.setBackgroundImage(object.url)
  }
}
