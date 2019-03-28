import { TrackingPage } from './../pages/tracking/tracking';
import { HistorialPage } from './../pages/historial/historial';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import  { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { UserPage } from '../pages/user/user';
import { RegisterPage } from '../pages/register/register';
import { JugarPage } from '../pages/jugar/jugar';
import { PreguntaPage } from '../pages/pregunta/pregunta';
import { ContestarPage } from '../pages/contestar/contestar';
import { FinalizadoPage } from '../pages/finalizado/finalizado';
import { CamaraPage } from '../pages/camara/camara';
import { Entorno } from '../models/urlconfig';
import { GeolocationPage } from '../pages/geolocation/geolocation';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CamaraPage,
    UserPage,
    RegisterPage,
    JugarPage,
    PreguntaPage,
    ContestarPage,
    FinalizadoPage,
    GeolocationPage,
    HistorialPage,
    TrackingPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CamaraPage,
    UserPage,
    RegisterPage,
    JugarPage,
    PreguntaPage,
    ContestarPage,
    FinalizadoPage,
    GeolocationPage,
    HistorialPage,
    TrackingPage,
    ListPage
  ],
  providers:
  [
    Camera,
    StatusBar,
    SplashScreen,
    Entorno,
    HttpClient,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
