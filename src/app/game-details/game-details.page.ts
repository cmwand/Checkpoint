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

  constructor(private route: ActivatedRoute, private igdbService: IgdbService) {}

  async ngOnInit() {
    const gameId = +this.route.snapshot.paramMap.get('id')!;
    this.game = await this.igdbService.getGameDetails(gameId);
  }
}
