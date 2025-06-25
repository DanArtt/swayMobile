import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { CarrinhoComponent } from 'src/app/components/carrinho/carrinho.component';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ThemeService } from 'src/app/services/theme.service';
import { register } from 'swiper/element/bundle';

register(); // Registra o Swiper para uso com Angular

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
  standalone: false,
})
export class SobreNosPage implements OnInit, AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperRef!: ElementRef;

  totalItensCarrinho: number = 0;

  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    private carrinhoService: CarrinhoService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.carrinhoService.totalItens$.subscribe((quantidade: number) => {
      this.totalItensCarrinho = quantidade;
    });

    this.themeService.initTheme();
  }

  ngAfterViewInit() {}
  membros = [
    {
      nome: 'Daniel Andrade',
      foto: '../../assets/danielfoto.jpg',
      descricao:
        'Desenvolvedor Front-End com foco em performance e estruturação de interfaces funcionais.',
      contribuicao:
        'Responsável pela implementação das telas do aplicativo, navegação entre páginas, e integração com componentes reutilizáveis da interface.',
    },
    {
      nome: 'Matheus Campos',
      foto: '../../assets/matheusfoto.jpg',
      descricao:
        'Especialista em lógica de programação e integração com serviços externos.',
      contribuicao:
        'Desenvolveu a parte de autenticação, integração com sistema de pagamentos e controle de pedidos no backend.',
    },
    {
      nome: 'Gabriel Leite',
      foto: '../../assets/gabrielfoto.jpg',
      descricao:
        'Responsável pela arquitetura geral do projeto, modelagem de dados e fluxo do usuário.',
      contribuicao:
        'Estruturou o banco de dados, definiu o fluxo de compra e organizou a base técnica do projeto para facilitar futuras escalabilidades.',
    },
  ];

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
}
