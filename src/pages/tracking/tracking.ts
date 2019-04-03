import { LocationTrackerProvider } from './../../providers/location-tracker/location-tracker';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

  logs: string[] = [];

  constructor(
    public locationTracker: LocationTrackerProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  start(){
    this.locationTracker.startTracking();
  }

  stop(){
    this.locationTracker.stopTracking();
  }

  // startBackgroundGeolocation(){
  //   this.backgroundGeolocation.isLocationEnabled()
  //   .then((rta) =>{
  //     if(rta){
  //       this.start();
  //     }else {
  //       this.backgroundGeolocation.showLocationSettings();
  //     }
  //   })
  // }

  // start(){

  //   const config: BackgroundGeolocationConfig = {
  //     desiredAccuracy: 10,
  //     stationaryRadius: 1,
  //     distanceFilter: 1,
  //     debug: true,
  //     stopOnTerminate: false,
  //     // Android only section
  //     locationProvider: 1,
  //     startForeground: true,
  //     interval: 6000,
  //     fastestInterval: 5000,
  //     activitiesInterval: 10000
  //   };

  //   console.log('start');

  //   this.backgroundGeolocation.configure(config)
  //   .subscribe((location: BackgroundGeolocationResponse) => {
  //     console.log(location);
  //     this.logs.push(`${location.latitude},${location.longitude}`);
  //   });

  //   // start recording location
  //   this.backgroundGeolocation.start();

  // }

  // stopBackgroundGeolocation(){
  //   this.backgroundGeolocation.stop();
  // }
}
