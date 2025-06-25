import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular'; // Importa IonicModule aqui
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-modal-ordenacao',
  standalone: true,
  templateUrl: './modal-ordenacao.component.html',
  styleUrls: ['./modal-ordenacao.component.scss'],
  imports: [IonicModule, CommonModule], // Importa Ionic e Common para usar os componentes e diretivas
})
export class ModalOrdenacaoComponent {
  constructor(
    private modalCtrl: ModalController,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
  }
  // Define o tema como 'dark' ao

  // Fecha o modal e retorna o tipo de ordenação selecionado
  ordenar(tipo: 'crescente' | 'decrescente') {
    this.modalCtrl.dismiss(tipo);
  }

  resetar() {
    this.modalCtrl.dismiss('resetar');
  }

  // Fecha o modal sem retornar nada
  fechar() {
    this.modalCtrl.dismiss();
  }
}
