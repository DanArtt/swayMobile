import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  MenuController,
  ModalController,
  LoadingController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { CarrinhoComponent } from '../components/carrinho/carrinho.component';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperRef!: ElementRef;

  produtos = [
    {
      nome: 'Camiseta ThugNine DouhBoy',
      preco: 179.99,
      imagem: '../../assets/CAMISETA-DOUGHBOY1.png',
      classificacao: '4.9',
    },
    {
      nome: 'T-Shirt Class Verde',
      preco: 179.99,
      imagem: '../../assets/T-SHIRT-CLASS-GREEN.png',
      classificacao: '4.3',
    },
    {
      nome: 'Short Trunda Off-White',
      preco: 179.99,
      imagem: '../../assets/SHORT-TUNDRA-OFF-WHITE.png',
      classificacao: '4.7',
    },
    {
      nome: 'Óculos De Sol Dunville',
      preco: 179.99,
      imagem: '../../assets/oculos-De-Sol-Dunville.png',
      classificacao: '4.5',
    },
  ];

  activeGroup = 0;
  activeSlide = 1;
  totalItensCarrinho: number = 0;

  constructor(
    private menu: MenuController,
    private loadingController: LoadingController,
    private router: Router,
    private modalCtrl: ModalController,
    private carrinhoService: CarrinhoService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const swiperEl = this.swiperRef.nativeElement;
      if (swiperEl?.swiper) {
        swiperEl.swiper.update();
      }
    }, 100);

    this.carrinhoService.totalItens$.subscribe((quantidade) => {
      this.totalItensCarrinho = quantidade;
    });
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
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

  async homeParaProdutos() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent',
      duration: 1700,
      cssClass: 'custom-loading',
    });

    await loading.present();

    setTimeout(() => {
      this.router.navigate(['/produtos']);
    }, 500);
  }

  setGroup(index: number) {
    this.activeGroup = index;
  }

  changeSlide(slideNumber: number) {
    this.activeSlide = slideNumber;
  }

  comprarProduto(produto: any) {
    this.carrinhoService.adicionarProduto(produto);
  }
}
