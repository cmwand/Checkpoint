import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-config-nt',
  templateUrl: './config-nt.page.html',
  styleUrls: ['./config-nt.page.scss'],
})
export class ConfigNtPage implements OnInit {
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
    private firestore: AngularFirestore
  ) { }

  saveSelections() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        this.firestore.collection('userChoices').doc(userId).update({
          selectedConsoles: firebase.firestore.FieldValue.arrayUnion(...this.selectedButtons)
        });
      }
    });
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
