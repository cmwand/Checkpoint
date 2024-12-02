import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-config-ps',
  templateUrl: './config-ps.page.html',
  styleUrls: ['./config-ps.page.scss'],
})
export class ConfigPsPage implements OnInit {
  selectedButtons: number[] = [];

  toggleSelection(buttonId: number) {
    const index = this.selectedButtons.indexOf(buttonId);
    if (index === -1) {
      this.selectedButtons.push(buttonId);
    } else {
      this.selectedButtons.splice(index, 1);
    }
  }

  constructor(
    private afAuth: AngularFireAuth,
    private modalController: ModalController,
    private afs: AngularFirestore,
    private firestore: AngularFirestore
  ) { }

  saveSelections() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        this.afs.collection('userChoices').doc(userId).set({
          selectedConsoles: firebase.firestore.FieldValue.arrayUnion(...this.selectedButtons)
        }, { merge: true });
      }
    });
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
