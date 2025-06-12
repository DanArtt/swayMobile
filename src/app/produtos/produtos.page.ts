import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProdutoService } from './produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  standalone: false,
})
export class ProdutosPage implements OnInit {
  produtos: any[] = [];
  activeGroup = 0;

  constructor(
    private menu: MenuController,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.menu.enable(true, 'mainMenu');

    this.produtoService.getProdutos().subscribe((data) => {
      this.produtos = data;
    });
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }

  setGroup(index: number) {
    this.activeGroup = index;
  }
}
