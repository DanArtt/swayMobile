import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor() {}

  getProdutos(): Observable<any[]> {
    return of([
      {
        id: 1,
        nome: 'Camiseta ThugNine DouhBoy',
        preco: 179.99,
        imagem: '../../assets/CAMISETA-DOUGHBOY1.png',
        imagemAlternativa: 'assets/products/CAMISETA-DOUGHBOY2.png',
        classificacao: '4.9',
      },
      {
        id: 2,
        nome: 'T-Shirt Class Verde',
        preco: 199.99,
        imagem: '../../assets/T-SHIRT-CLASS-GREEN.png',
        imagemAlternativa: '../../assets/products/T-SHIRT-CLASS-GREEN2.png',
        classificacao: '4.3',
      },
      {
        id: 3,
        nome: 'Bermuda Trunda Off-White',
        preco: 159.99,
        imagem: '../../assets/SHORT-TUNDRA-OFF-WHITE.png',
        imagemAlternativa: '../../assets/products/SHORT-TUNDRA-OFF-WHITE2.png',
        classificacao: '4.7',
      },
      {
        id: 4,
        nome: 'Óculos De Sol Dunville',
        preco: 129.99,
        imagem: '../../assets/oculos-De-Sol-Dunville.png',
        imagemAlternativa: '../../assets/products/oculos-De-Sol-Dunville2.png',
        classificacao: '4.5',
      },
      {
        id: 5,
        nome: 'Boné Aba Curva PAC3 Preto',
        preco: 99.89,
        imagem: '../../assets/products/bone1.png',
        imagemAlternativa: '../../assets/products/bone2.png',
        classificacao: '4.6',
      },
      {
        id: 6,
        nome: 'Bermuda ThugNine Preta Chino',
        preco: 159.99,
        imagem: '../../assets/products/BERMUDA-CHINO1.png',
        imagemAlternativa: '../../assets/products/BERMUDA-CHINO2.png',
        classificacao: '4.9',
      },
      {
        id: 7,
        nome: 'PAC3 Boulder Tee Oversized',
        preco: 189.99,
        imagem: '../../assets/products/Boulder-Tee-Oversized1.png',
        imagemAlternativa: '../../assets/products/Boulder-Tee-Oversized2.png',
        classificacao: '4.8',
      },
      {
        id: 8,
        nome: 'Camisa Vans Smith Warm II',
        preco: 179.99,
        imagem: '../../assets/products/Camisa-Smith-Ii-ss-Warm1.png',
        imagemAlternativa: '../../assets/products/Camisa-Smith-Ii-ss-Warm2.png',
        classificacao: '4.8',
      },
      {
        id: 9,
        nome: 'Camiseta Feminina Vans Night Bloom',
        preco: 159.99,
        imagem: '../../assets/products/Camiseta-Night-Bloom1.png',
        imagemAlternativa: '../../assets/products/Camiseta-Night-Bloom2.png',
        classificacao: '4.9',
      },
      {
        id: 10,
        nome: 'Camiseta Skate Blurb Feminina Vans',
        preco: 159.99,
        imagem: '../../assets/products/Camiseta-Skate-Blurb-ss1.png',
        imagemAlternativa: '../../assets/products/Camiseta-Skate-Blurb-ss2.png',
        classificacao: '4.7',
      },
      {
        id: 11,
        nome: 'Carnan x Copacabana',
        preco: 199.99,
        imagem: '../../assets/products/Carnan-x-CP-Copacana1.png',
        imagemAlternativa: '../../assets/products/Carnan-x-CP-Copacana2.png',
        classificacao: '4.8',
      },
      {
        id: 12,
        nome: 'Cropped ThugNine',
        preco: 139.99,
        imagem: '../../assets/products/CROPPED-ATOALHADO1.png',
        imagemAlternativa: '../../assets/products/CROPPED-ATOALHADO2.png',
        classificacao: '4.7',
      },
      {
        id: 13,
        nome: 'Bag Feminina ThugNine',
        preco: 119.99,
        imagem: '../../assets/products/ESSENTIAL-BAG1.png',
        imagemAlternativa: '../../assets/products/ESSENTIAL-BAG2.png',
        classificacao: '4.5',
      },
      {
        id: 14,
        nome: 'Short Feminino ThugNine',
        preco: 139.99,
        imagem: '../../assets/products/SHORT-ATOALHADO1.png',
        imagemAlternativa: '../../assets/products/SHORT-ATOALHADO2.png',
        classificacao: '4.7',
      },
      {
        id: 15,
        nome: 'Bermuda High Masculina',
        preco: 159.99,
        imagem: '../../assets/products/Swim-Shorts-Logo-Green1.png',
        imagemAlternativa: '../../assets/products/Swim-Shorts-Logo-Green2.png',
        classificacao: '4.5',
      },
      {
        id: 16,
        nome: 'Camiseta Class Oversized',
        preco: 189.99,
        imagem: '../../assets/products/t-shirt-class1.png',
        imagemAlternativa: '../../assets/products/t-shirt-class2.png',
        classificacao: '4.9',
      },
      {
        id: 17,
        nome: 'Camiseta SufGang Preta Oversized',
        preco: 189.99,
        imagem: '../../assets/products/TEE-SUFMANJI-BLACK1.png',
        imagemAlternativa: '../../assets/products/TEE-SUFMANJI-BLACK2.png',
        classificacao: '4.7',
      },
      {
        id: 18,
        nome: 'Bermuda High Preta',
        preco: 159.99,
        imagem: '../../assets/products/Trail-Shorts-Black1.png',
        imagemAlternativa: '../../assets/products/Trail-Shorts-Black2.png',
        classificacao: '4.6',
      },
    ]);
  }
}
