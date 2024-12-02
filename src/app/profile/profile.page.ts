import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = '';
  selectedImage: string = 'assets/img/icons/default.png';
  imageList: string[] = [
    'assets/img/icons/akuma.jpg',
    'assets/img/icons/arthur.png',
    'assets/img/icons/ciri.jpg',
    'assets/img/icons/cj.png',
    'assets/img/icons/cobrasolida.jpg',
    'assets/img/icons/dante.jpg',
    'assets/img/icons/ellie.png',
    'assets/img/icons/frisk.png',
    'assets/img/icons/jill.png',
    'assets/img/icons/joker.jpg',
    'assets/img/icons/kirby.png',
    'assets/img/icons/knuckles.jpg',
    'assets/img/icons/lara.jpg',
    'assets/img/icons/leon.png',
    'assets/img/icons/malenia.jpg',
    'assets/img/icons/masterchefe.jpg',
    'assets/img/icons/samus.jpg',
    'assets/img/icons/scorpion.jpg',
    'assets/img/icons/storm.png',
    'assets/img/icons/yasuo.jpg'
  ];

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loadUsername();
  }

  loadUsername() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.afs.collection('users').doc(userId).valueChanges().subscribe(
          (userData: any) => {
            this.username = userData?.username || 'Usuário';
            this.selectedImage = userData?.profileImage || this.selectedImage;
          }
        );
      }
    });
  }

  selectImage(image: string) {
    this.selectedImage = image;
    this.updateProfileImage(image);
  }

  updateProfileImage(image: string) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.afs.collection('users').doc(userId).update({
          profileImage: image,
        }).then(() => {
          console.log('Imagem de perfil atualizada com sucesso!');
        }).catch((error) => {
          console.error('Erro ao atualizar imagem de perfil:', error);
        });
      }
    });
  }

  goToOtherPage() {
    this.router.navigate(['/other-page'], {
      queryParams: { image: this.selectedImage }
    });
  }
}
