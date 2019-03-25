import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google : any;

@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage
{
  data : any;
  loading: Loading;

  @ViewChild('map') mapRef : ElementRef
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private geolocation: Geolocation) {}

  ionViewDidLoad()
  {
    this.loading = this.loadCtrl.create();
    this.loading.present();
    this.obtenerUbicacion();
  }

  obtenerUbicacion()
  {
    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
      this.dibujarMapa(resp);
     }).catch((error) => {
       console.log('Error getting location', error);
       this.loading.dismiss();
     });
  }

  dibujarMapa(position: Geoposition)
  {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    const locacion = new google.maps.LatLng(lat, long);

    const options =
    {
      center: locacion,
      zoom: 18
    };

    const mapa = new google.maps.Map(this.mapRef.nativeElement, options);

    google.maps.event.addListenerOnce(mapa, 'idle', () => {
      this.loading.dismiss();
      let marker = new google.maps.Marker({
        position: locacion,
        map: mapa
      })
    }

    // this.Marker(locacion, mapa);
  )};

  // Marker(locacion, mapa)
  // {
  //   return new google.maps.Marker
  //   ({
  //     position: locacion,
  //     map: mapa
  //   })
  // }

}
