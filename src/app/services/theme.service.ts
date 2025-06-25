import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  /**
   * Aplica o tema salvo ou o tema padrão (claro).
   */
  initTheme(): void {
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme === null) {
      // Nenhum tema salvo, aplica o modo claro
      this.setDarkMode(false);
    } else {
      // Aplica o tema salvo
      const isDark = savedTheme === 'true';
      this.setDarkMode(isDark);
    }
  }

  /**
   * Ativa ou desativa o modo escuro.
   */
  setDarkMode(enabled: boolean): void {
    document.body.classList.toggle('dark', enabled);
    localStorage.setItem('darkMode', enabled.toString());
  }

  /**
   * Alterna o modo atual.
   */
  toggleDarkMode(): void {
    const isCurrentlyDark = document.body.classList.contains('dark');
    this.setDarkMode(!isCurrentlyDark);
  }
}
