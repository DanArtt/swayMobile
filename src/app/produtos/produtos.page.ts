import { Component, OnInit } from '@angular/core';
import {
  MenuController,
  ModalController,
  LoadingController,
} from '@ionic/angular';
import { ProdutoService } from './produtos.service';
import { Router } from '@angular/router';
import { ModalOrdenacaoComponent } from '../modal-ordenacao/modal-ordenacao.component'; // Modal de ordenação

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  standalone: false,
})
export class ProdutosPage implements OnInit {
  produtos: any[] = []; // Lista de produtos a ser exibida
  produtosOriginais: any[] = []; // Cópia da lista original (para resetar)
  activeGroup = 0;
  ordenarPorNome = false; // Controle do checkbox "ordenar por nome"

  constructor(
    private menu: MenuController,
    private produtoService: ProdutoService,
    private loadingController: LoadingController,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  // Botão com loading que volta para a página Home
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

  // Ao iniciar a página, carrega produtos do serviço
  ngOnInit() {
    this.menu.enable(true, 'mainMenu');

    this.produtoService.getProdutos().subscribe((data) => {
      const produtosPreparados = data.map((produto) => ({
        ...produto,
        imagemAtual: produto.imagem,
        imagemAlternativa: produto.imagemAlternativa || produto.imagem,
      }));

      this.produtos = [...produtosPreparados];
      this.produtosOriginais = [...produtosPreparados]; // Salva cópia original
    });
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }

  setGroup(index: number) {
    this.activeGroup = index;
  }

  // Troca imagem do produto (hover/click)
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

  // Checkbox: ordena por nome A-Z ou reseta
  ordenarProdutos() {
    if (this.ordenarPorNome) {
      this.produtos.sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      this.produtos = [...this.produtosOriginais]; // Restaura original
    }
  }

  // Abre modal de ordenação por preço (↑ ↓ ou resetar)
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
