import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuario: any = {};
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuario.name = user.displayName;
        this.usuario.id = user.uid;
      }
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  logOut() {
    this.usuario = {};
    return this.afAuth.signOut();
  }
}
