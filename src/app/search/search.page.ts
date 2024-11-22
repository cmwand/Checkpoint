import { Component, OnInit, OnDestroy } from '@angular/core';
import { IgdbService } from '../igdb.service';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  searchQuery: string = '';
  games: any[] = [];
  private searchSubject = new Subject<string>();

  constructor(private igdbService: IgdbService, private navCtrl: NavController) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((query) => this.igdbService.searchGames(query))
    ).subscribe((games) => {
      this.games = games;
    });
  }

  ngOnDestroy() {
    this.searchSubject.unsubscribe();
  }

  onSearchChange(event: any) {
    this.searchSubject.next(this.searchQuery);
  }

  goToGameDetails(gameId: number) {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }
}
