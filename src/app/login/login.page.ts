import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  loginParaHome() {
    this.router.navigate(['/home']);
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Autenticando...',
      spinner: 'crescent',
      duration: 2000,
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.authService
      .login(this.email, this.senha)
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/home']);
      })
      .catch(async (err) => {
        loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Erro ao autenticar: ' + err.message,
          duration: 3000,
          color: 'danger',
        });
        toast.present();
      });
  }
}
