import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'gp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private _afAuth: AngularFireAuth,
    private _router: Router
  ) {}

  user: any;
  url: string;

  ngOnInit() {

    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.url = event.url;
      });

    this._afAuth.user
      .subscribe(res => {
        this.user = res;
        if (res && this.url === '/login') {
          this._router.navigate(['']);
        }

      });
  }

  login() {
    this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this._afAuth.auth.signOut();
    this._router.navigate(['login']);
  }
}
