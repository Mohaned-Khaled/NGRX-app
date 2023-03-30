import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { getToken } from '../auth/state/auth.selectors';

@Injectable()
export class AuthToken implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token) => {
        if (!token) {
          return next.handle(req);
        } else {
          const modifiedReq = req.clone({
            params: req.params.append('auth', token),
          });
          return next.handle(modifiedReq);
        }
      })
    );
  }
}
