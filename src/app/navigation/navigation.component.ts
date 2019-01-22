import { Component, HostListener } from '@angular/core';
import { GameboardService } from '../gameboard.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  opened: boolean = false;

  //  grid size mat-slider options
  gridSizeMax = 100;
  gridSizeMin = 25;
  gridSizeStep = 1;
  gridSizeValue = 50;
  gridSizeDisabled = false

  //  grid position options
  gridPositionX = 0
  gridPositionY = 0

  constructor(private gameboardService: GameboardService) { }
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);


  private toggleSideNav() {
    this.opened = !this.opened
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'm') {
      this.toggleSideNav()
    }
    event.stopPropagation();
  }


  gridValueOnChange() {
    if (this.gridSizeValue >= this.gridSizeMin && this.gridSizeValue <= this.gridSizeMax) {
      console.log('redrawing with value: ' + this.gridSizeValue)
      this.gameboardService.changeGridSize(this.gridSizeValue, this.gridPositionX, this.gridPositionY)
    } else {
      this.gridSizeValue = Math.min(Math.max(this.gridSizeValue, this.gridSizeMin), this.gridSizeMax);
    }
  }

  gridPositionOnChange() {
    this.gameboardService.changeGridSize(this.gridSizeValue, this.gridPositionX, this.gridPositionY)
  }
}