import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  // 🔗 Dados dos inputs
  nome!: string;
  dataNascimento!: string;
  cpf!: string;
  email!: string;
  senha!: string;
  confirmarSenha!: string;

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  // 🚀 Método para registrar no Firebase
  async register() {
    if (!this.email || !this.senha || !this.confirmarSenha) {
      this.mostrarAlerta('Erro', 'Preencha todos os campos.');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mostrarAlerta('Erro', 'As senhas não coincidem.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Criando sua conta...',
      spinner: 'crescent',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.authService
      .register(this.email, this.senha)
      .then(() => {
        loading.dismiss();
        this.mostrarAlerta('Sucesso', 'Conta criada com sucesso!');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        loading.dismiss();
        let mensagem = '';

        switch (error.code) {
          case 'auth/email-already-in-use':
            mensagem = 'Este e-mail já está em uso.';
            break;
          case 'auth/invalid-email':
            mensagem = 'E-mail inválido.';
            break;
          case 'auth/weak-password':
            mensagem = 'Senha fraca. Mínimo 6 caracteres.';
            break;
          default:
            mensagem = 'Erro ao criar conta.';
            break;
        }

        this.mostrarAlerta('Erro', mensagem);
      });
  }

  // 🔙 Voltar para home com loading
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

  // 📢 Alerta
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
