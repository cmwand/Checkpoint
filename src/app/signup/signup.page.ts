import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private modalController: ModalController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertCtrl: AlertController
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async signup() {
    if (this.password !== this.confirmPassword) {
      this.showAlert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      await this.firestore.collection('users').doc(userCredential.user?.uid).set({
        email: this.email,
        username: this.username
      });

      this.showAlert('Sucesso', 'Usuário criado com sucesso!');
      this.closeModal();
    } catch (error) {
      this.handleFirebaseError(error);
    }
  }

  handleFirebaseError(error: any) {
    let message = '';
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Este email já está em uso.';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido.';
        break;
      case 'auth/weak-password':
        message = 'A senha deve ter no mínimo 6 caracteres.';
        break;
      default:
        message = 'Ocorreu um erro. Tente novamente.';
    }
    this.showAlert('Erro', message);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {}
}
