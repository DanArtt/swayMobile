import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
//Slides
export class HomePage implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperRef!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      const swiperEl = this.swiperRef.nativeElement;
      if (swiperEl && swiperEl.swiper) {
        swiperEl.swiper.update();
      }
    }, 100); // espera um pouco para garantir que tudo esteja renderizado
  }

  constructor(
    private menu: MenuController,
    private loadingController: LoadingController,
    private router: Router
  ) {}
  //Looding da pagina principal para Produtos
  async homeParaProdutos() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent',
      duration: 1700, // ou remova para fechar manualmente
      cssClass: 'custom-loading',
    });

    await loading.present();

    setTimeout(() => {
      this.router.navigate(['/produtos']);
    }, 500); // tempo para o loading aparecer antes da navegação
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }

  //Visualização dos produtos
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
    // Adicione mais produtos aqui!
  ];

  activeGroup = 0;

  setGroup(index: number) {
    this.activeGroup = index;
  }

  //Slide Propaganda
  activeSlide = 1;

  changeSlide(slideNumber: number) {
    this.activeSlide = slideNumber;
  }
}
