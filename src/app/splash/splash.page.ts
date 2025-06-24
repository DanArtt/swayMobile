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
    // Inicia o áudio
    this.audio.src = '../assets/sounds/tema-metro-rio.mp3';
    this.audio.load();
    this.audio.play().catch((e) => {
      console.log('Erro ao tocar áudio:', e);
    });

    // Timer de 3 segundos para navegação
    setTimeout(() => {
      this.audio.pause();
      this.router.navigateByUrl('/home');
    }, 8000);
  }
}
