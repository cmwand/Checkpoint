import { Component } from '@angular/core';
import { IgdbService } from '../igdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  searchQuery: string = '';
  games: any[] = [];

  constructor(private igdbService: IgdbService, private navCtrl: NavController) {}

  async searchGames() {
    if (this.searchQuery.trim()) {
      this.games = await this.igdbService.searchGames(this.searchQuery);
    }
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}
