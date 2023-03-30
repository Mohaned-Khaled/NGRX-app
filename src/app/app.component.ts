import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/state/auth.actions';
import { getErrorMessage, getShowLoading } from './state/shared/sharedSelector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.showLoading = this.store.select(getShowLoading);
    this.errorMessage = this.store.select(getErrorMessage);

    this.store.dispatch(autoLogin());
  }
}
