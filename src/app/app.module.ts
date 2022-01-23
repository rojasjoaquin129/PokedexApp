import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseModule } from './core/firebase/firebase.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS } from './core/state/app.state';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './core/state/effects/auth.effects';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FirebaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
