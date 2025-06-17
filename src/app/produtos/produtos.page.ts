import { Component, OnInit } from '@angular/core';
import {
  MenuController,
  ModalController,
  LoadingController,
} from '@ionic/angular';
import { ProdutoService } from './produtos.service';
import { Router } from '@angular/router';
import { ModalOrdenacaoComponent } from '../components/modal-ordenacao/modal-ordenacao.component';
import { CarrinhoComponent } from '../components/carrinho/carrinho.component';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  standalone: false,
})
export class ProdutosPage implements OnInit {
  produtos: any[] = [];
  produtosOriginais: any[] = [];
  activeGroup = 0;
  ordenarPorNome = false;
  totalItensCarrinho: number = 0; // contador do carrinho

  constructor(
    private menu: MenuController,
    private produtoService: ProdutoService,
    private loadingController: LoadingController,
    private router: Router,
    private modalCtrl: ModalController,
    private carrinhoService: CarrinhoService
  ) {}

  // Método para redirecionar para a página inicial
  // e exibir um loading personalizado
  async produtosParaHome() {
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

  ngOnInit() {
    this.menu.enable(true, 'mainMenu');

    this.produtoService.getProdutos().subscribe((data) => {
      const produtosPreparados = data.map((produto) => ({
        ...produto,
        imagemAtual: produto.imagem,
        imagemAlternativa: produto.imagemAlternativa || produto.imagem,
      }));

      this.produtos = [...produtosPreparados];
      this.produtosOriginais = [...produtosPreparados];
    });

    // Atualiza contador do carrinho em tempo real
    this.carrinhoService.totalItens$.subscribe((quantidade) => {
      this.totalItensCarrinho = quantidade;
    });
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }

  setGroup(index: number) {
    this.activeGroup = index;
  }

  trocarImagem(event: any, produto: any) {
    const imgElement = event.target as HTMLImageElement;

    if (imgElement) {
      imgElement.classList.add('fade-out');

      setTimeout(() => {
        produto.imagemAtual =
          produto.imagemAtual === produto.imagem
            ? produto.imagemAlternativa
            : produto.imagem;

        imgElement.classList.remove('fade-out');
      }, 400);
    } else {
      produto.imagemAtual =
        produto.imagemAtual === produto.imagem
          ? produto.imagemAlternativa
          : produto.imagem;
    }
  }

  adicionarAoCarrinho(produto: any) {
    this.carrinhoService.adicionarProduto(produto);
  }

  ordenarProdutos() {
    if (this.ordenarPorNome) {
      this.produtos.sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      this.produtos = [...this.produtosOriginais];
    }
  }

  async abrirCarrinho() {
    const modal = await this.modalCtrl.create({
      component: CarrinhoComponent,
      cssClass: 'carrinho-modal',
      backdropDismiss: true,
      showBackdrop: true,
      animated: true,
    });
    await modal.present();
  }

  async abrirModalOrdenacao() {
    const modal = await this.modalCtrl.create({
      component: ModalOrdenacaoComponent,
      presentingElement: await this.modalCtrl.getTop(),
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
      backdropDismiss: true,
      cssClass: 'meu-modal-sheet',
    });

    await modal.present();

    const res = await modal.onWillDismiss();
    const ordem = res.data;

    if (!ordem) return;

    if (ordem === 'crescente') {
      this.produtos.sort((a, b) => a.preco - b.preco);
    } else if (ordem === 'decrescente') {
      this.produtos.sort((a, b) => b.preco - a.preco);
    } else if (ordem === 'resetar') {
      this.produtos = [...this.produtosOriginais];
      this.ordenarPorNome = false;
    }
  }
}
