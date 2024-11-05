import { Component, OnInit } from '@angular/core';
import { IgdbService } from '../../igdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ps4-games',
  templateUrl: './ps4-games.component.html',
  styleUrls: ['./ps4-games.component.scss'],
})
export class Ps4GamesComponent implements OnInit {
  ps4Games: any[] = [];
  visiblePs4Games: any[] = [];
  currentIndex: number = 0;

  constructor(private igdbService: IgdbService, private navCtrl: NavController) {}

  async ngOnInit() {
    this.igdbService.getPs4Games().subscribe((games) => {
      this.ps4Games = games;
      this.updateVisibleGames();
    });
  }

  nextGame() {
    if (this.currentIndex + 4 < this.ps4Games.length) {
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
    this.visiblePs4Games = this.ps4Games.slice(this.currentIndex, this.currentIndex + 4);
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}
