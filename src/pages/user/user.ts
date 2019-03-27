import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { JugarPage } from '../jugar/jugar';
import { HttpClient } from '@angular/common/http';
import { CamaraPage } from '../camara/camara';
import { GeolocationPage } from '../geolocation/geolocation';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})




export class UserPage
{
  userMobile: any;

  constructor(public navCtrl: NavController, public http:HttpClient) {}

  ionViewWillEnter()
  {
    var readUserLocalStorage = localStorage.getItem('userMobile');
    if(readUserLocalStorage != null)
    {
      this.userMobile = JSON.parse(readUserLocalStorage);
    }
  }

  logout()
  {
      localStorage.removeItem('userMobile');
      this.navCtrl.setRoot(HomePage);
  }

  jugar()
  {
    this.navCtrl.setRoot(JugarPage);
  }

  //Camara
  camara()
  {
    this.navCtrl.setRoot(CamaraPage);
  }
  mapa()
  {
    this.navCtrl.push(GeolocationPage);
  }
}
