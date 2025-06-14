import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  constructor(
    private loadingController: LoadingController,
    private router: Router
  ) {}

  //Looding da pagina Register para Home
  async registerParaHome() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent',
      duration: 1700,
      cssClass: 'custom-loading',
    });

    await loading.present();

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }

  ngOnInit() {}
}
