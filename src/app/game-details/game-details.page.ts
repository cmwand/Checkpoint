import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IgdbService } from '../igdb.service';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  game: any;
  gameId: string = '';
  isInWishlist: boolean = false;
  isInMyGames: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private igdbService: IgdbService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameId = gameId;
      this.loadGameDetails(gameId);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.checkIfInLists(user.uid);
        }
      });
    }
  }

  loadGameDetails(gameId: string) {
    this.igdbService.getGameDetails(Number(gameId)).subscribe(
      (game) => {
        this.game = game;
      },
      (error) => {
        console.error('Erro ao obter detalhes do jogo:', error);
      }
    );
  }

  getPlatformNames(): string {
    return this.game && this.game.platforms
      ? this.game.platforms.map((platform: any) => platform.name).join(', ')
      : '';
  }

  getGenreNames(): string {
    return this.game && this.game.genres
      ? this.game.genres.map((genre: any) => genre.name).join(', ')
      : '';
  }

  getCategoryName(
    category: number,
    originalGameName: string | null = null,
    originalGameId: number | null = null
  ): string {
    let categoryName = '';

    switch (category) {
      case 0:
        categoryName = ' Jogo';
        break;
      case 1:
        categoryName = ' DLC';
        break;
      case 2:
        categoryName = ' Expansão';
        break;
      case 3:
        categoryName = ' Bundle';
        break;
      case 4:
        categoryName = ' Expansão Standalone';
        break;
      case 5:
        categoryName = ' Mod';
        break;
      case 6:
        categoryName = ' Episódio';
        break;
      case 7:
        categoryName = ' Temporada';
        break;
      case 8:
        categoryName = ' Remake';
        break;
      case 9:
        categoryName = ' Remaster';
        break;
      case 10:
        categoryName = ' Jogo Expandido';
        break;
      case 11:
        categoryName = ' Port';
        break;
      case 12:
        categoryName = ' Fork';
        break;
      case 13:
        categoryName = ' Pacote';
        break;
      case 14:
        categoryName = ' Atualização';
        break;
      default:
        categoryName = ' Tipo Desconhecido';
        break;
    }

    if (originalGameName && originalGameId) {
      categoryName += ` de <a href="/game-details/${originalGameId}">${originalGameName}</a>`;
    }

    return categoryName;
  }

  checkIfInLists(userId: string) {
    const wishlistRef = this.afs.collection('users').doc(userId).collection('wishlist');
    const myGamesRef = this.afs.collection('users').doc(userId).collection('myGames');
  
    wishlistRef.doc(this.gameId).get().subscribe((doc) => {
      if (doc.exists) {
        this.isInWishlist = true;
      }
    });
  
    myGamesRef.doc(this.gameId).get().subscribe((doc) => {
      if (doc.exists) {
        this.isInMyGames = true;
      }
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      cssClass: 'custom-loading',
    });
    await toast.present();
  }

  toggleWishlist() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const wishlistRef = this.afs
          .collection('users')
          .doc(user.uid)
          .collection('wishlist')
          .doc(this.gameId);

        if (this.isInWishlist) {
          wishlistRef.delete().then(() => {
            this.isInWishlist = false;
            this.showToast('Jogo removido da Lista de Desejos');
          });
        } else {
          wishlistRef.set({ gameId: this.gameId }).then(() => {
            this.isInWishlist = true;
            this.showToast('Jogo adicionado à Lista de Desejos');
          });
        }
      }
    });
  }

  toggleMyGames() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const myGamesRef = this.afs
          .collection('users')
          .doc(user.uid)
          .collection('myGames')
          .doc(this.gameId);

        if (this.isInMyGames) {
          myGamesRef.delete().then(() => {
            this.isInMyGames = false;
            this.showToast('Jogo removido de Meus Jogos');
          });
        } else {
          myGamesRef.set({ gameId: this.gameId }).then(() => {
            this.isInMyGames = true;
            this.showToast('Jogo adicionado à Meus Jogos');
          });
        }
      }
    });
  }
}
