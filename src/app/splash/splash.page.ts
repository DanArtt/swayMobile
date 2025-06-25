import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: false,
})
export class SplashPage implements OnInit {
  private audio = new Audio();

  constructor(private router: Router) {}

  ngOnInit() {
    this.audio.src = '../assets/sounds/tema-metro-rio.mp3';
    this.audio.load();
    this.audio.play().catch((e) => {
      console.log('Erro ao tocar áudio:', e);
    });

    const splash = document.querySelector('.splash-screen');
    splash?.classList.add('enter');

    setTimeout(() => {
      splash?.classList.remove('enter');
      splash?.classList.add('exit');

      // Aguarda o fade-out terminar
      setTimeout(() => {
        this.audio.pause();
        // Redireciona para home com fade-in
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }, 1500);
    }, 8000);
  }
}
