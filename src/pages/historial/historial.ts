import { HistorialService } from './../../services/historial-service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google : any;

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
  providers:[HistorialService]
})
export class HistorialPage 
{
  loading: Loading;
  @ViewChild('map') mapRef : ElementRef;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private geolocation: Geolocation,
              private historial: HistorialService) {}

  ionViewDidLoad() {
    this.loading = this.loadCtrl.create();
    this.loading.present();
    //this.dibujarMapa();
    this.obtenerHistorial();
  }

  dibujarMapa()
  {

    const locacion = new google.maps.LatLng('-34.5377264', '-58.4690324');

    const options =
    {
      center: locacion,
      zoom: 15
    };

    const mapa = new google.maps.Map(this.mapRef.nativeElement, options);

    google.maps.event.addListenerOnce(mapa, 'idle', () => 
    {
      this.loading.dismiss();
    }
    
  )};

  obtenerHistorial()
  {
    let readUserLocalStorage = localStorage.getItem('userMobile');
    let pepo = JSON.parse(readUserLocalStorage);
    let usuario =
    {
      Token: pepo.Token,
      UsuarioId: pepo.UsuarioId
    }
    var contenido = "?UsuarioId="+usuario.UsuarioId+"&Token="+usuario.Token+"&contenido=";//+objStr;
    const locacion = new google.maps.LatLng('-34.5377264', '-58.4690324');
    const options =
    {
      center: locacion,
      zoom: 15
    };
    const mapa = new google.maps.Map(this.mapRef.nativeElement, options);

    google.maps.event.addListenerOnce(mapa, 'idle', () => 
    {
      this.loading.dismiss();
    });

    this.historial.historialGet(contenido)
    .subscribe( res =>
    {
      let data = res.json();
      console.log(data);
      if(data.Result)
      {
        var localizaciones = data.Result;
        var infowindow = new google.maps.InfoWindow();
        var marker, i;

        for (i = 0; i < localizaciones.length; i++) 
        {  
          let lat = localizaciones[i].Latitud;
          let long = localizaciones[i].Longitud;
          const locacion = new google.maps.LatLng(lat, long);

          marker = new google.maps.Marker({
          position: locacion,
          map: mapa
        });
        }

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(localizaciones[i][0]);
            infowindow.open(mapa, marker);
          }
        })(marker, i));
  
      }
    });
  }
}
