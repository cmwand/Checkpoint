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
  anticipatedGames: any[] = [];
  visibleAnticipatedGames: any[] = [];
  selectedConsoles: number[] = [];
  currentTrendingIndex: number = 0;
  currentAnticipatedIndex: number = 0;

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

    // Obter jogos populares e mais aguardados
    this.igdbService.getTrendingGames().subscribe((games) => {
      this.trendingGames = games;
      this.updateVisibleTrendingGames();
    });

    this.igdbService.getMostAnticipatedGames().subscribe((games) => {
      this.anticipatedGames = games;
      this.updateVisibleAnticipatedGames();
    });

    this.hideLoading();
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

        this.afs.collection('users').doc(userId).valueChanges().subscribe((data: any) => {
          this.selectedConsoles = data?.choices?.selectedConsoles || [];
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

  nextGame(section: string) {
    if (section === 'trending' && this.currentTrendingIndex + 4 < this.trendingGames.length) {
      this.currentTrendingIndex += 1;
      this.updateVisibleTrendingGames();
    } else if (section === 'anticipated' && this.currentAnticipatedIndex + 4 < this.anticipatedGames.length) {
      this.currentAnticipatedIndex += 1;
      this.updateVisibleAnticipatedGames();
    }
  }

  previousGame(section: string) {
    if (section === 'trending' && this.currentTrendingIndex > 0) {
      this.currentTrendingIndex -= 1;
      this.updateVisibleTrendingGames();
    } else if (section === 'anticipated' && this.currentAnticipatedIndex > 0) {
      this.currentAnticipatedIndex -= 1;
      this.updateVisibleAnticipatedGames();
    }
  }

  updateVisibleTrendingGames() {
    this.visibleTrendingGames = this.trendingGames.slice(this.currentTrendingIndex, this.currentTrendingIndex + 4);
  }

  updateVisibleAnticipatedGames() {
    this.visibleAnticipatedGames = this.anticipatedGames.slice(this.currentAnticipatedIndex, this.currentAnticipatedIndex + 4);
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}
