import { isDevMode, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { appReducer } from './state/app.state';
import { AuthEffects } from './auth/state/auth.effects';
import { PostEffects } from './posts/state/posts.effects';
import { AuthToken } from './services/auth-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    EffectsModule.forRoot([AuthEffects]),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthToken, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
