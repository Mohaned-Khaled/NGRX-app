import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/state/app.state';
import {
  showErrorAction,
  showLoadingAction,
} from 'src/app/state/shared/shared.action';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  logoutAction,
  signupStart,
  signupSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  timer: any;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(showLoadingAction({ status: false }));

            clearTimeout(this.timer);
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);

            return loginSuccess({ user, redirect: true });
          }),
          catchError((errorRes) => {
            this.store.dispatch(showLoadingAction({ status: false }));

            const errorMsg = errorRes.error.error.message;
            const errorMessage = this.authService.getErrorMessage(errorMsg);

            this.timer = setTimeout(() => {
              this.store.dispatch(showErrorAction({ message: null }));
            }, 3000);

            return of(showErrorAction({ message: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      exhaustMap((data) => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((data) => {
        return this.authService.signup(data.email, data.password).pipe(
          map((data) => {
            this.store.dispatch(showLoadingAction({ status: false }));

            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);

            return signupSuccess({ user, redirect: true });
          }),
          catchError((errorRes) => {
            this.store.dispatch(showLoadingAction({ status: false }));

            const errorMsg = errorRes.error.error.message;
            const errorMessage = this.authService.getErrorMessage(errorMsg);

            this.timer = setTimeout(() => {
              this.store.dispatch(showErrorAction({ message: null }));
            }, 3000);

            return of(showErrorAction({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((data) => {
          if (data.redirect) this.router.navigate(['/']);
          this.store.dispatch(showErrorAction({ message: null }));
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        tap((data) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );
}
