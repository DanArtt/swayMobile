import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
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
}
