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
      credits: 'The Last of Us Part II (2020) - Sony Interactive Entertainment',
    },
    {
      src: 'assets/img/control.png',
      credits: 'Control (2019) - Remedy Entertainment',
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
      src: 'assets/img/re4.jpg',
      credits: 'Resident Evil 4 Remake (2023) - CAPCOM',
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
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
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