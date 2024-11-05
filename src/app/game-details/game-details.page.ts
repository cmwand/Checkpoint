import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IgdbService } from '../igdb.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  game: any;

  
  constructor(
    private route: ActivatedRoute,
    private igdbService: IgdbService
  ) {}

  async ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.game = await this.igdbService.getGameDetails(Number(gameId));
      console.log('Detalhes do jogo:', this.game);
    }
  }

  getCategoryName(category: number, originalGameName: string | null = null, originalGameId: number | null = null): string {
    let categoryName = '';
    
    switch (category) {
      case 0: categoryName = ' Jogo'; break;
      case 1: categoryName = ' DLC'; break;
      case 2: categoryName = ' Expansão'; break;
      case 3: categoryName = ' Bundle'; break;
      case 4: categoryName = ' Expansão Standalone'; break;
      case 5: categoryName = ' Mod'; break;
      case 6: categoryName = ' Episódio'; break;
      case 7: categoryName = ' Temporada'; break;
      case 8: categoryName = ' Remake'; break;
      case 9: categoryName = ' Remaster'; break;
      case 10: categoryName = ' Jogo Expandido'; break;
      case 11: categoryName = ' Port'; break;
      case 12: categoryName = ' Fork'; break;
      case 13: categoryName = ' Pacote'; break;
      case 14: categoryName = ' Atualização'; break;
      default: categoryName = ' Tipo Desconhecido'; break;
    }

    if (originalGameName && originalGameId) {
        categoryName += ` de <a href="/game-details/${originalGameId}">${originalGameName}</a>`;
    }

    return categoryName;
}


}
