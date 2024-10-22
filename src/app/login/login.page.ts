import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface User {
  email: string;
  username: string;
  // Adicione outros campos que você espera receber
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private modalController: ModalController,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private firestore: AngularFirestore
  ) {}

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

  async login() {
    try {
      const userDoc = await this.firestore.collection('users', ref => ref.where('username', '==', this.username)).get().toPromise();

      if (userDoc && !userDoc.empty) {
        const user = userDoc.docs[0].data() as User; // Type assertion aqui
        await this.afAuth.signInWithEmailAndPassword(user.email, this.password); // Use user.email
        this.showAlert('Sucesso', 'Login realizado com sucesso!');
        this.closeModal();
      } else {
        this.showAlert('Erro', 'Usuário não encontrado.');
      }
    } catch (error) {
      this.handleFirebaseError(error);
    }
  }

  handleFirebaseError(error: any) {
    let message = '';
    switch (error.code) {
      case 'auth/wrong-password':
        message = 'Senha incorreta.';
        break;
      case 'auth/user-not-found':
        message = 'Usuário não encontrado.';
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
