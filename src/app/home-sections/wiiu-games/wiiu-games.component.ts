import { Component, OnInit } from '@angular/core';
import { IgdbService } from '../../igdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-Wiiu-games',
  templateUrl: './Wiiu-games.component.html',
  styleUrls: ['./Wiiu-games.component.scss'],
})
export class WiiuGamesComponent implements OnInit {
  WiiuGames: any[] = [];
  visibleWiiuGames: any[] = [];
  currentIndex: number = 0;

  constructor(private igdbService: IgdbService, private navCtrl: NavController) {}

  async ngOnInit() {
    this.igdbService.getWiiuGames().subscribe((games) => {
      this.WiiuGames = games;
      this.updateVisibleGames();
    });
  }

  nextGame() {
    if (this.currentIndex + 4 < this.WiiuGames.length) {
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
    this.visibleWiiuGames = this.WiiuGames.slice(this.currentIndex, this.currentIndex + 4);
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}
