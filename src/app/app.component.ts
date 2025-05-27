import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MenuController } from '@ionic/angular';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  expanded: boolean[] = [false, false, false, false];

  constructor(private menu: MenuController) {}

  closeMenu() {
    this.menu.close('mainMenu');
  }

  toggleMenu(index: number) {
    this.expanded[index] = !this.expanded[index];
  }
}
