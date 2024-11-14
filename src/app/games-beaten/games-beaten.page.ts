import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IgdbService } from '../igdb.service';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-games-beaten',
  templateUrl: './games-beaten.page.html',
  styleUrls: ['./games-beaten.page.scss'],
})
export class GamesBeatenPage implements OnInit {
  games$: Observable<any[]> | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private igdbService: IgdbService
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const gamesRef = this.afs.collection('users').doc(user.uid).collection('myGames');
        gamesRef.get().subscribe((snapshot) => {
          const gameIds = snapshot.docs.map(doc => doc.id);
          this.loadGamePosters(gameIds);
        });
      }
    });
  }

  loadGamePosters(gameIds: string[]) {
    const gameRequests = gameIds.map((id) => this.igdbService.getGameDetails(Number(id)));
    this.games$ = forkJoin(gameRequests);
  }

  goToGameDetails(gameId: string) {
    this.router.navigate(['/game-details', gameId]);
  }
}
