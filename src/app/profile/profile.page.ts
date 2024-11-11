import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = '';

  constructor(
    private afAuth: AngularFireAuth, private afs: AngularFirestore
  ) { }

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
            },
          );
        }
      });
    }
  }
