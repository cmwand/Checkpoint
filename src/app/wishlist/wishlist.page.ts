import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IgdbService } from '../igdb.service';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  wishlist$: Observable<any[]> | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private igdbService: IgdbService
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const wishlistRef = this.afs.collection('users').doc(user.uid).collection('wishlist');
        wishlistRef.get().subscribe((snapshot) => {
          const gameIds = snapshot.docs.map(doc => doc.id);
          this.loadWishlistPosters(gameIds);
        });
      }
    });
  }

  loadWishlistPosters(gameIds: string[]) {
    const gameRequests = gameIds.map((id) => this.igdbService.getGameDetails(Number(id)));
    this.wishlist$ = forkJoin(gameRequests);
  }

  goToGameDetails(gameId: string) {
    this.router.navigate(['/game-details', gameId]);
  }
}
