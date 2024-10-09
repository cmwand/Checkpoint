import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  images = [
    {
      src: 'assets/img/tlou2.jpg',
      credits: 'The Last of Us Part II (2020) - Sony Interactive Entertainment',
    },
    {
      src: 'assets/img/control.png',
      credits: 'Control (2019) - Remedy Entertainment',
    },
    {
      src: 'assets/img/alien.png',
      credits: 'Alien: Isolation (2014) - Sega',
    },
    {
      src: 'assets/img/bioshock.png',
      credits: 'Bioshock Infinite (2013) - 2K Games'
    }
  ];

  currentIndex = 0;
  fadeState = 'in';

  constructor() {}

  ngOnInit() {
    this.fadeState = 'in';
    setInterval(() => {
      this.fadeState = 'out';
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.fadeState = 'in';
      }, 1000);
    }, 6000);
  }
}
