import { Injectable, ElementRef } from "@angular/core";
import { Object, Result, ObjectsProperties, Coordinates } from "../object.interface";
import { OBJECTS } from "../mock-objects";
import { GameboardService } from './gameboard.service';

@Injectable({
  providedIn: "root"
})
export class ObjectsService {
  stage: HTMLDivElement;
  draggableImg: HTMLDivElement;
  objects: Object[];
  objectsOnBoard: Array<ObjectsProperties> = []
  idCounter: number = 0

  constructor(private gameboardService: GameboardService) { }

  setStage(stage: ElementRef, draggableImg: ElementRef) {
    this.stage = <HTMLDivElement>stage.nativeElement;
    this.draggableImg = <HTMLDivElement>draggableImg.nativeElement;
  }

  addImageToStage(object: Object) {
    let img = <HTMLDivElement>this.draggableImg.cloneNode(false);
    img.id = this.idCounter.toString();
    let width = object.width * this.gameboardService.getGridSize()
    img.setAttribute("src", object.url);
    img.setAttribute("width", width.toString());
    this.makeElementDraggable(img);
    this.stage.appendChild(img);
    this.addObjectProperties(object)
    this.idCounter++
  }

  addObjectProperties(object) {
    object.position = {}
    object.position.x = 0
    object.position.y = 0
    object.rotation = 0
    object.id = this.idCounter.toString()
    this.objectsOnBoard.push(object)
  }

  makeElementDraggable(element) {
    this.dragElement(element);
  }

  getObjects(): Object[] {
    return OBJECTS;
  }

  rotateElement(element: HTMLElement) {
    let filteredObjectsOnBoard = this.objectsOnBoard.filter(object => object.id === element.id)
    let object: ObjectsProperties = filteredObjectsOnBoard[0]
    object.rotation = (object.rotation + 45) % 360
    element.style.transform = `rotate(${object.rotation}deg)`
  }

  getObjectsInfo(): Result {
    let result: Result = { backgrounds: [], objects: [] };

    this.getObjects().forEach(object => {
      switch (object.type) {
        case "object":
          result.objects.push(object);
          break;
        case "background":
          result.backgrounds.push(object);
          break;
        default:
          console.log(`Unknown Object type: ${object.type}`, object);
      }
    });
    return result;
  }

  updateObjectProperties(id: string, position: Coordinates) {
    let filteredObjectsOnBoard = this.objectsOnBoard.filter(object => object.id === id)
    let object: ObjectsProperties = filteredObjectsOnBoard[0]
    object.position = position
  }


  dragElement(elmnt: HTMLElement) {
    let that = this
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      let coords: Coordinates = { x: elmnt.style.top, y: elmnt.style.left }
      that.updateObjectProperties(elmnt.id, coords)

    }
  }



}


