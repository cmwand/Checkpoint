import { Component, OnInit } from '@angular/core';
import { IgdbService } from '../../igdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-xbox-games',
  templateUrl: './xbox-games.component.html',
  styleUrls: ['./xbox-games.component.scss'],
})
export class XboxGamesComponent implements OnInit {
  XboxGames: any[] = [];
  visibleXboxGames: any[] = [];
  currentIndex: number = 0;

  constructor(private igdbService: IgdbService, private navCtrl: NavController) {}

  async ngOnInit() {
    this.igdbService.getXboxGames().subscribe((games) => {
      this.XboxGames = games;
      this.updateVisibleGames();
    });
  }

  nextGame() {
    if (this.currentIndex + 4 < this.XboxGames.length) {
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
    this.visibleXboxGames = this.XboxGames.slice(this.currentIndex, this.currentIndex + 4);
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}
