import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

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

  // Estado do modo escuro
  darkMode = false;
  isDarkMode = false; // usado para trocar a logo dinamicamente
  darkModeLabel = 'Modo Escuro';
  darkModeIcon = 'moon';

  constructor(
    private menu: MenuController,
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.authService.getAuthState().subscribe((user) => {
      this.usuarioEmail = user ? user.email : null;
    });

    // Aplica o tema salvo ou inicia com modo claro por padrão
    this.themeService.initTheme();

    // Recupera o estado salvo e atualiza variáveis
    const savedTheme = localStorage.getItem('darkMode');
    const isDark = savedTheme === 'true';

    this.darkMode = isDark;
    this.isDarkMode = isDark;
    this.updateDarkModeUI(isDark);
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

  toggleDarkTheme(shouldAdd: boolean) {
    this.themeService.setDarkMode(shouldAdd);
    this.darkMode = shouldAdd;
    this.isDarkMode = shouldAdd;
    this.updateDarkModeUI(shouldAdd);
  }

  private updateDarkModeUI(isDark: boolean) {
    this.darkModeLabel = isDark ? 'Modo Escuro' : 'Modo Claro';
    this.darkModeIcon = isDark ? 'moon' : 'sunny';
  }
}
