import { Component } from '@angular/core';
import { IgdbService } from '../igdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  searchQuery: string = '';
  games: any[] = [];

  constructor(private igdbService: IgdbService) {}

  async searchGames() {
    if (this.searchQuery.trim()) {
      try {
        this.games = await this.igdbService.searchGames(this.searchQuery);
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);
      }
    } else {
      this.games = [];
    }
  }
}
