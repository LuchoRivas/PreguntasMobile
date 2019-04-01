import { TrackingPage } from './../pages/tracking/tracking';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { JugarPage } from '../pages/jugar/jugar';
import { InfinitescrollPage } from '../pages/infinitescroll/infinitescroll';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  id;
  token;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private onesignal: OneSignal) {
    this.initializeApp();

    // this.onesignal.startInit("1886c3d2-8245-4231-b79f-936dfc473cb5", "750133270745");

    // this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.InAppAlert);

    // this.onesignal.setSubscription(true);

    // this.onesignal.getIds()
    // .then((ids) => {
    //   this.id = ids.userId;
    //   this.token = ids.pushToken;
    // });

    // this.onesignal.handleNotificationReceived().subscribe(() => {

    // });

    // this.onesignal.handleNotificationOpened().subscribe(() => {
      
    // });

    // this.onesignal.endInit();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Jugar', component: JugarPage },
      { title: 'Tracking', component: TrackingPage },
      { title: 'Scroll', component: InfinitescrollPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
      .startInit("1886c3d2-8245-4231-b79f-936dfc473cb5", "750133270745")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
