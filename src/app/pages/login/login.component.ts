import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'gp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private _afAuth: AngularFireAuth
  ) { }

  login() {
    this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
