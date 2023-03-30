import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environment/enviroment';
import { logoutAction } from '../auth/state/auth.actions';
import { AuthResponseData } from '../models/auth-response-data.model';
import { User } from '../models/user.model';
import { AppState } from '../state/app.state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  timerInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      { email, password, returnSecureToken: true },
      {
        params: new HttpParams().append('key', environment.FIREBASE_API_KEY),
      }
    );
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {
        email,
        password,
        returnSecureToken: true,
      },
      { params: new HttpParams().append('key', environment.FIREBASE_API_KEY) }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );

    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );

    return user;
  }

  getErrorMessage(errorMsg: string) {
    switch (errorMsg) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email is already exist';
      default:
        return 'Unknown error occurred, Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user) {
    const timer = user.expireDate.getTime() - new Date().getTime();

    this.timerInterval = setTimeout(() => {
      this.store.dispatch(logoutAction());
    }, timer);
  }

  getUserFromLocalStorage() {
    const userStringify = localStorage.getItem('user');

    if (userStringify) {
      const userData = JSON.parse(userStringify);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('user');

    if (this.timerInterval) {
      clearTimeout(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
