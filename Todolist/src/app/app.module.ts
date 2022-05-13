import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from '@angular/fire/auth'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCMc3OYhP3PwLRklFzYHgpnAreuGA8LQ1g",
    authDomain: "todolist-angular-ionic.firebaseapp.com",
    projectId: "todolist-angular-ionic",
    storageBucket: "todolist-angular-ionic.appspot.com",
    messagingSenderId: "821887711341",
    appId: "1:821887711341:web:4543101953c11a9c656764"
  }
};

const initialize = environment.firebase


@NgModule({




  declarations: [AppComponent], 
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(initialize)),
    provideFirestore(() => getFirestore()),
    provideAuth(() =>  getAuth())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
