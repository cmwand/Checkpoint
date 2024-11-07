import { Component, OnInit } from '@angular/core';
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
  trendingGames: any[] = [];
  visibleTrendingGames: any[] = [];
  currentIndex: number = 0;

  constructor(private igdbService: IgdbService, private navCtrl: NavController, private router: Router, private modalController: ModalController, private afAuth: AngularFireAuth, private afs: AngularFirestore,) {}

  async ngOnInit() {
    this.loadUsername();
    this.igdbService.getMostAnticipatedGames().subscribe((games) => {
      this.trendingGames = games;
      this.updateVisibleGames();
    });
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

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    })
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