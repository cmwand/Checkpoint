import { Component, OnInit } from '@angular/core';
import { IgdbService } from '../../igdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-XboxOne-games',
  templateUrl: './XboxOne-games.component.html',
  styleUrls: ['./XboxOne-games.component.scss'],
})
export class XboxOneGamesComponent implements OnInit {
  XboxOneGames: any[] = [];
  visibleXboxOneGames: any[] = [];
  currentIndex: number = 0;

  constructor(private igdbService: IgdbService, private navCtrl: NavController) {}

  async ngOnInit() {
    this.igdbService.getXboxoneGames().subscribe((games) => {
      this.XboxOneGames = games;
      this.updateVisibleGames();
    });
  }

  nextGame() {
    if (this.currentIndex + 4 < this.XboxOneGames.length) {
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
    this.visibleXboxOneGames = this.XboxOneGames.slice(this.currentIndex, this.currentIndex + 4);
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}
