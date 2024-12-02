import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-config-xb',
  templateUrl: './config-xb.page.html',
  styleUrls: ['./config-xb.page.scss'],
})
export class ConfigXbPage implements OnInit {
  selectedButtons: number[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private modalController: ModalController,
    private afs: AngularFirestore,
    private firestore: AngularFirestore
  ) { }

  toggleSelection(buttonId: number) {
    const index = this.selectedButtons.indexOf(buttonId);
    if (index === -1) {
      this.selectedButtons.push(buttonId);
    } else {
      this.selectedButtons.splice(index, 1);
    }
  }

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
