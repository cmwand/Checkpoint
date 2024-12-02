import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ConfigPsPage } from '../config-ps/config-ps.page';
import { ConfigXbPage } from '../config-xb/config-xb.page';
import { ConfigNtPage } from '../config-nt/config-nt.page';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  username: string = '';
  selectedButtons: number[] = [];

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

  

  toggleSelection(buttonId: number) {
    const index = this.selectedButtons.indexOf(buttonId);
    if (index === -1) {
      this.selectedButtons.push(buttonId);
    } else {
      this.selectedButtons.splice(index, 1);
    }
  }

  saveSelections() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.afs
          .collection('users')
          .doc(userId)
          .set(
            {
              choices: {
                selectedConsoles: firebase.firestore.FieldValue.arrayUnion(...this.selectedButtons)
              },
            },
            { merge: true }
          )
      }
    });
  }

  clearSelections() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.afs
          .collection('users')
          .doc(userId)
          .set(
            {
              choices: {
                selectedConsoles: []
              },
            },
            { merge: true }
          )
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
