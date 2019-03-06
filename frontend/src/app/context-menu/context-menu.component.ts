import { Component, OnInit, Input } from "@angular/core";
import { ObjectsService } from "../services/objects.service";

@Component({
  selector: "app-context-menu",
  templateUrl: "./context-menu.component.html",
  styleUrls: ["./context-menu.component.css"]
})
export class ContextMenuComponent implements OnInit {
  constructor(private objectService: ObjectsService) {}

  @Input() x = 0;
  @Input() y = 0;
  @Input() rightClickedElement: HTMLElement;

  ngOnInit() {}

  rotate(deg: number) {
    this.objectService.rotateElement(this.rightClickedElement, deg);
  }

  rotateBy45() {
    this.objectService.rotateElementBy45(this.rightClickedElement);
  }

  delete() {
    this.objectService.deleteElement(this.rightClickedElement);
  }
}
