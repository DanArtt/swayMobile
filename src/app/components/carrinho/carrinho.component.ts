import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular'; // Importa ToastController
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
  standalone: false,
})
export class CarrinhoComponent implements OnInit {
  itens: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController, // Injeta ToastController
    private carrinhoService: CarrinhoService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.initTheme();
    this.carregarItens();
  }

  carregarItens() {
    this.itens = this.carrinhoService.obterCarrinho();
  }

  removerItem(index: number) {
    this.carrinhoService.removerProduto(index);
    this.carregarItens();
  }

  incrementarQuantidade(index: number) {
    this.itens[index].quantidade++;
  }

  decrementarQuantidade(index: number) {
    if (this.itens[index].quantidade > 1) {
      this.itens[index].quantidade--;
    } else {
      this.removerItem(index);
    }
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

  get total(): number {
    return this.itens.reduce(
      (soma, item) => soma + item.preco * (item.quantidade ?? 1),
      0
    );
  }

  async finalizarCompra() {
    // Cria e exibe o toast
    const toast = await this.toastController.create({
      message: 'Compra finalizada com sucesso!',
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();

    this.carrinhoService.limparCarrinho();
    this.fechar();
  }
}
