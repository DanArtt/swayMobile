import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private itensCarrinho: any[] = [];
  private totalItensSubject = new BehaviorSubject<number>(0);

  totalItens$ = this.totalItensSubject.asObservable(); // observable público

  adicionarProduto(produto: any) {
    const existente = this.itensCarrinho.find((p) => p.nome === produto.nome);
    if (existente) {
      existente.quantidade += 1;
    } else {
      this.itensCarrinho.push({ ...produto, quantidade: 1 });
    }
    this.atualizarContagem();
  }

  removerProduto(index: number) {
    this.itensCarrinho.splice(index, 1);
    this.atualizarContagem();
  }

  obterCarrinho() {
    return this.itensCarrinho;
  }

  limparCarrinho() {
    this.itensCarrinho = [];
    this.atualizarContagem();
  }

  atualizarContagem() {
    const total = this.itensCarrinho.reduce(
      (soma, item) => soma + item.quantidade,
      0
    );
    this.totalItensSubject.next(total);
  }
}
