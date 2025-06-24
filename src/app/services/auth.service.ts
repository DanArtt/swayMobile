import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // 🔑 Registrar usuário
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // 🔓 Login
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // 🚪 Logout
  logout() {
    return this.afAuth.signOut();
  }

  // 👤 Observar estado de autenticação (verificar se está logado)
  getAuthState() {
    return this.afAuth.authState;
  }

  // 🔁 Redefinir senha por email
  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
