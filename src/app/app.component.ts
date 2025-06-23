import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  expanded: boolean[] = [false, false, false];
  usuarioEmail: string | null = null;

  constructor(
    private menu: MenuController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAuthState().subscribe((user) => {
      this.usuarioEmail = user ? user.email : null;
    });
  }

  closeMenu() {
    this.menu.close('mainMenu');
  }

  toggleMenu(index: number) {
    this.expanded[index] = !this.expanded[index];
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
    this.menu.close('mainMenu');
  }

  logout() {
    this.authService.logout().then(() => {
      this.usuarioEmail = null;
      this.router.navigate(['/login']);
      this.menu.close('mainMenu');
    });
  }
}
