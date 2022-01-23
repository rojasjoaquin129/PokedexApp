import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/core/state/actions/auth.actions';
import { AppState } from 'src/app/core/state/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
  logOut() {
    this.store.dispatch(logOut());
  }
}
