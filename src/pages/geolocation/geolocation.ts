import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { SincroService } from '../../services/sincronizacion-service';

declare var google : any;

@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
  providers: [SincroService]
})

export class GeolocationPage
{
  data : any;
  loading: Loading;
  locacion: any;
  array = [];
  userMobile: any;
  @ViewChild('map') mapRef : ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private geolocation: Geolocation,
              private sincroservice: SincroService) {}

  ionViewDidLoad()
  {
    var readUserLocalStorage = localStorage.getItem('userMobile');
    if(readUserLocalStorage != null)
    {
      this.userMobile = JSON.parse(readUserLocalStorage);
    }
    this.loading = this.loadCtrl.create();
    this.loading.present();
    this.obtenerUbicacion();
  }

  obtenerUbicacion()
  {
    const cfg =
    {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(cfg).then((resp) => 
    {
      this.dibujarMapa(resp);
     }).catch((error) => 
     {
       console.log('Error... pepeHands', error);
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
      zoom: 15
    };

    const mapa = new google.maps.Map(this.mapRef.nativeElement, options);

    google.maps.event.addListenerOnce(mapa, 'idle', () => 
    {
      this.loading.dismiss();
      let marker = new google.maps.Marker({
        position: locacion,
        map: mapa
      })
    }
  )};

  guardarUbicacion()
  {

    const cfg =
    {
      enableHighAccuracy: true
    };
    
    this.geolocation.getCurrentPosition(cfg).then((resp) => 
    {
      var fechaJs = new Date();
      var fecha = fechaJs.toLocaleString();
      let ubicacionUsuario = 
      {
        Latitud: resp.coords.latitude,
        Longitud: resp.coords.longitude,
        FechaHora: fecha
      };

      this.array.push(ubicacionUsuario);
      this.userMobile.Localizaciones = this.array;
      let pepe = JSON.stringify(this.userMobile);
      localStorage.setItem('userMobile', pepe);

     }).catch((error) => 
     {
       console.log('Error... pepeHands', error);
       this.loading.dismiss();
     });
  }
  // Sincroniza las localizaciones
  sincro()
  {
    let readUserLocalStorage = localStorage.getItem('userMobile');
    let pepo = JSON.parse(readUserLocalStorage);
    let formData : FormData = new FormData();
    let usuarioData =
    {
      Token: pepo.Token,
      UsuarioId: pepo.UsuarioId,
      Localizaciones: pepo.Localizaciones
    }
    var contenido = JSON.stringify(pepo.Localizaciones);
    formData.append('contenido', contenido);
    formData.append('usuarioId', usuarioData.UsuarioId);
    formData.append('Token', usuarioData.Token);

    this.sincroservice.SincroPost(formData)
    .subscribe( res =>
    {
      let data = res.json();
      console.log(data)

    })
  }
}
