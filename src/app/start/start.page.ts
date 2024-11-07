import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AboutPage } from '../about/about.page';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  
  images = [
    {
      src: 'assets/img/tlou2.jpg',
      credits: 'The Last of Us Part II (2020) - Naughty Dog',
    },
    {
      src: 'assets/img/re4.jpg',
      credits: 'Resident Evil 4 (2023) - CAPCOM',
    },
    {
      src: 'assets/img/eldenring.png',
      credits: 'Elden Ring (2020) - From Software',
    },
    {
      src: 'assets/img/alanwake2.png',
      credits: 'Alan Wake 2 (2023) - Remedy Entertainment',
    },
    {
      src: 'assets/img/skyrim.png',
      credits: 'The Elder Scrolls V: Skyrim (2011) - Bethesda',
    },
    {
      src: 'assets/img/metroid3.png',
      credits: 'Metroid Prime 3: Corruption (2007) - Nintendo',
    },
    {
      src: 'assets/img/gears.png',
      credits: 'Gears of War (2006) - Epic Games',
    },
    {
      src: 'assets/img/sf6.png',
      credits: 'Street Fighter 6 (2023) - CAPCOM',
    },
    {
      src: 'assets/img/control.png',
      credits: 'Control (2019) - Remedy Entertainment',
    },
    {
      src: 'assets/img/fnv.jpg',
      credits: 'Fallout: New Vegas (2010) - Obsidian',
    },
    {
      src: 'assets/img/tekken8.png',
      credits: 'Tekken 8 (2024) - Bandai Namco',
    },
    {
      src: 'assets/img/alien.png',
      credits: 'Alien: Isolation (2014) - Sega',
    },
    {
      src: 'assets/img/untildawn.png',
      credits: 'Until Dawn (2015) - Supermassive Games',
    },
    {
      src: 'assets/img/portal2.png',
      credits: 'Portal 2 (2011) - Valve',
    },
    {
      src: 'assets/img/batmanak.jpg',
      credits: 'Batman: Arkham Knight (2015) - Rocksteady',
    }
  ];
  
  currentIndex = 0;
  fadeState = 'in';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.startImageCarousel();
  }

  startImageCarousel() {
    setInterval(() => {
      this.fadeState = 'out';
      setTimeout(() => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * this.images.length);
        } while (newIndex === this.currentIndex);
  
        this.currentIndex = newIndex;
        this.fadeState = 'in';
      }, 1000);
    }, 6000);
  }

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'login-modal',
    });
    return await modal.present();
  }

  async openAboutModal() {
    const modal = await this.modalController.create({
      component: AboutPage, 
      cssClass: 'about-modal',
    });
    return await modal.present();
  }
}