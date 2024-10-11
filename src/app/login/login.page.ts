import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async openSignupModal() {
    await this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: SignupPage,
      cssClass: 'signup-modal',
    });
    return await modal.present();
  }
}
