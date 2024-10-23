import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigPsPage } from '../config-ps/config-ps.page';
import { ConfigXbPage } from '../config-xb/config-xb.page';
import { ConfigNtPage } from '../config-nt/config-nt.page';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage {

  constructor(private modalController: ModalController) {}

  async openPsModal() {
    const modal = await this.modalController.create({
      component: ConfigPsPage,
    });
    return await modal.present();
  }

  async openXbModal() {
    const modal = await this.modalController.create({
      component: ConfigXbPage,
    });
    return await modal.present();
  }

  async openNtModal() {
    const modal = await this.modalController.create({
      component: ConfigNtPage,
    });
    return await modal.present();
  }
}
