import { LoginService } from './../../services/login-service';
import { Entorno } from './../../models/urlconfig';
import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [LoginService]
})

export class RegisterPage {

  usuario:string;
  nickname:string;
  password:string;
  confPassword:string;
  errorLogin : any[];

    constructor(public navCtrl: NavController, public http: HttpClient, private entorno: Entorno, private loginService: LoginService) {

    }

    public gotoAbout(){
        this.navCtrl.push(RegisterPage);
    }

    register()
  {
    //let url = this.entorno.url+'Account/RegisterMobile';
    //let postData = new FormData();
    let errorLogin : any[];
    // postData.append('Email', this.usuario);
    // postData.append('Password', this.password);
    // postData.append('ConfirmPassword', this.confPassword);
    // postData.append('NickName', this.nickname);
    // postData.append('esMobile', 'true');
    //Almacena los campos de registro en la interface FormData


    let postData =
    {
      Email: this.usuario,
      Password: this.password,
      ConfirmPassword: this.confPassword,
      NickName: this.nickname,
      esMobile: true
    }

    this.loginService.register(postData)
    .subscribe( res =>
    {
      let data = res.json();
      console.log(res);
      if(data.Error != null)
      {
        this.errorLogin = data.Error;
      }

      if (data.Response != null)
      {
        let pepe = JSON.stringify(data.Response);
        if(data.Result)
        {
          //Almacena la respuesta del registro exitoso en el Local Storage
          localStorage.setItem('userMobile', pepe);
        }
        //Root al Home con el usuario almacenado en el Local Storage
        this.navCtrl.setRoot(HomePage, {userMobile: pepe});
      }
    });

    console.log(postData);
  }

}
