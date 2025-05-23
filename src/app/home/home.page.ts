import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperRef!: ElementRef;

  constructor(private menu: MenuController) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const swiperEl = this.swiperRef.nativeElement;
      if (swiperEl && swiperEl.swiper) {
        swiperEl.swiper.update();
      }
    }, 100); // espera um pouco para garantir que tudo esteja renderizado
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }

  produtos = [
    {
      nome: 'Camiseta ThugNine DouhBoy',
      preco: 179.99,
      imagem: '../../assets/CAMISETA-DOUGHBOY1.png',
    },
    {
      nome: 'T-Shirt Class Verde',
      preco: 179.99,
      imagem: '../../assets/T-SHIRT-CLASS-GREEN.png',
    },
    {
      nome: 'Short Trunda Off-White',
      preco: 179.99,
      imagem: '../../assets/SHORT-TUNDRA-OFF-WHITE.png',
    },
    {
      nome: 'Óculos De Sol Dunville',
      preco: 179.99,
      imagem: '../../assets/oculos-De-Sol-Dunville.png',
    },
    // Adicione mais produtos aqui!
  ];

  activeGroup = 0;

  setGroup(index: number) {
    this.activeGroup = index;
  }
}

