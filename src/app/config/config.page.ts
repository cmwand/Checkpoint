import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ConfigPsPage } from '../config-ps/config-ps.page';
import { ConfigXbPage } from '../config-xb/config-xb.page';
import { ConfigNtPage } from '../config-nt/config-nt.page';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  username: string = '';

  constructor(private modalController: ModalController, private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  async ngOnInit() {
    this.loadUsername();
  }

  loadUsername() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.afs.collection('users').doc(userId).valueChanges().subscribe(
          (userData: any) => {
            this.username = userData?.username || 'Usuário';
          },
        );
      }
    });
  }

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
