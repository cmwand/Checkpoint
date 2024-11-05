import { Component, OnInit } from '@angular/core';
import { IgdbService } from 'src/app/igdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ps2-games',
  templateUrl: './ps2-games.component.html',
  styleUrls: ['./ps2-games.component.scss'],
})
export class Ps2GamesComponent implements OnInit {
  ps2Games: any[] = [];
  visiblePs2Games: any[] = [];
  currentIndex: number = 0;

  constructor(private igdbService: IgdbService, private navCtrl: NavController) {}

  async ngOnInit() {
    this.igdbService.getPs2Games().subscribe((games) => {
      this.ps2Games = games;
      this.updateVisibleGames();
    });
  }

  nextGame() {
    if (this.currentIndex + 4 < this.ps2Games.length) {
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
    this.visiblePs2Games = this.ps2Games.slice(this.currentIndex, this.currentIndex + 4);
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}