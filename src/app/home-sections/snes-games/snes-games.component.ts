import { Component, OnInit } from '@angular/core';
import { IgdbService } from '../../igdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-Snes-games',
  templateUrl: './Snes-games.component.html',
  styleUrls: ['./Snes-games.component.scss'],
})
export class SnesGamesComponent implements OnInit {
  SnesGames: any[] = [];
  visibleSnesGames: any[] = [];
  currentIndex: number = 0;

  constructor(private igdbService: IgdbService, private navCtrl: NavController) {}

  async ngOnInit() {
    this.igdbService.getSnesGames().subscribe((games) => {
      this.SnesGames = games;
      this.updateVisibleGames();
    });
  }

  nextGame() {
    if (this.currentIndex + 4 < this.SnesGames.length) {
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
    this.visibleSnesGames = this.SnesGames.slice(this.currentIndex, this.currentIndex + 4);
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}
