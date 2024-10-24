import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private modalController: ModalController,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController
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
      // Faz a autenticação usando email e senha
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.showAlert('Sucesso', 'Login realizado com sucesso!');
      this.closeModal();
    } catch (error) {
      this.handleFirebaseError(error);
    }
  }

  handleFirebaseError(error: any) {
    let message = '';
    switch (error.code) {
      case 'auth/wrong-password':
        message = 'Senha incorreta. Verifique e tente novamente.';
        break;
      case 'auth/user-not-found':
        message = 'Usuário não encontrado. Verifique o email informado.';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido. Verifique o formato do email.';
        break;
      case 'auth/invalid-credential':
        message = 'Credenciais inválidas. Verifique suas informações.';
        break;
      case 'auth/too-many-requests':
        message = 'Muitas tentativas falhadas. Tente novamente mais tarde.';
        break;
      default:
        message = error.message || 'Ocorreu um erro. Tente novamente.';
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
