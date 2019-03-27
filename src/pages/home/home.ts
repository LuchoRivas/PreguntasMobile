import { Entorno } from './../../models/urlconfig';
import { LoginService } from './../../services/login-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserPage } from '../user/user';
import { RegisterPage } from '../register/register';
import { Token } from '@angular/compiler';
import { CamaraPage } from '../camara/camara';
import { GeolocationPage } from '../geolocation/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[LoginService]
})

export class HomePage
{
  // usuario: string;
  // password: string;
  // recordar: boolean;
  // result: any;
  // data: Observable<any>;
  datos : any[];
  errorLogin: any[];
  Email: string;
  Password: string;
  isMobile: boolean;
  //log: any = { Email: "", Password: "" };

  constructor(public navCtrl: NavController,
              public httpClient:HttpClient,
              public navParams: NavParams,
              public entorno: Entorno,
              private loginService: LoginService)
  {
  }

  //Pantalla Home/Login
  ionViewWillEnter(){
    //Verifica si hay un usuario en el Local Storage
    var readUserLocalStorage = localStorage.getItem('userMobile');
    if(readUserLocalStorage != null)
    {
      //Direcciona al panel de usuario
      this.navCtrl.setRoot(UserPage);
    }
  }


  // Tocas login y empieza esto
  login()
  {
    let usuario ={
      Email : this.Email,
      Password : this.Password,
      isMobile: 1
    }
    //var url = 'http://localhost:63266/Account/LoginMobile';
    // let formPostData = new FormData();
    // formPostData.append('Email', this.usuario);
    // formPostData.append('Password', this.password);
    // formPostData.append('isMobile', 'true');
    //let headers = new Headers();
    //headers.append("Accept", 'application/json');
    //headers.append('Content-Type', 'application/json');
    let errorLogin : any[];
    //Data del login de usuario
    // let postData =
    // {
    //   "Email": this.usuario,
    //   "Password": this.password,
    //   "RememberMe": this.recordar, //No se usa mas
    //   "Token": "",
    //   "isMobile": 1
    // }

    //Envia por POST login de usuario

    this.loginService.logear(usuario)
    .subscribe( res =>
    {
      let data = res.json();
      if(data.Error != "")
      {
        this.errorLogin = data.Error;
      }
      if (data.Response.Respuesta == "OK")
      {
        //Login exitoso
        //Almacena toda la data del usuario en un string en el Local Storage
        let pepe = JSON.stringify(data.Response);
        localStorage.setItem('userMobile', pepe);
        //Root a la pantalla de usuario con pepe como UserMobile
        this.navCtrl.setRoot(UserPage, { userMobile: pepe });
      }
      else {
        alert("No se pudieron sincronizar los datos")
      }
    });
  }
  // Para registrar
  register()
  {
    this.navCtrl.push(RegisterPage);
  }
}
