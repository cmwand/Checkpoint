import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AboutPage } from '../about/about.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IgdbService } from '../igdb.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  profileImage: string = 'assets/img/icons/default.png';
  trendingGames: any[] = [];
  visibleTrendingGames: any[] = [];
  selectedConsoles: number[] = [];
  currentIndex: number = 0;

  constructor(
    private igdbService: IgdbService,
    private navCtrl: NavController,
    private router: Router,
    private modalController: ModalController,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.loadUsername();
    await this.showLoading();
    this.igdbService.getMostAnticipatedGames().subscribe((games) => {
      this.trendingGames = games;
      this.updateVisibleGames();
      this.hideLoading();
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Entrando em contato com os servidores da Twitch, por favor aguarde...',
      spinner: 'crescent',
      cssClass: 'custom-loading',
    });
    await loading.present();
  }

  async hideLoading() {
    await this.loadingCtrl.dismiss();
  }

  loadUsername() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.afs.collection('users').doc(userId).valueChanges().subscribe((userData: any) => {
          this.username = userData?.username || 'Usuário';
          this.profileImage = userData?.profileImage || this.profileImage;
        });

        this.afs.collection('userChoices').doc(userId).valueChanges().subscribe((data: any) => {
          this.selectedConsoles = data?.selectedConsoles || [];
        });
      }
    });
  }

  isConsoleSelected(consoleId: number): boolean {
    return this.selectedConsoles.includes(consoleId);
  }

  async openAboutModal() {
    const modal = await this.modalController.create({
      component: AboutPage,
      cssClass: 'about-modal',
    });
    return await modal.present();
  }

  nextGame() {
    if (this.currentIndex + 4 < this.trendingGames.length) {
      this.currentIndex += 1;
      this.updateVisibleGames();
    }
  }

  previousGame() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.updateVisibleGames();
    }
  }

  updateVisibleGames() {
    this.visibleTrendingGames = this.trendingGames.slice(this.currentIndex, this.currentIndex + 4);
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}
