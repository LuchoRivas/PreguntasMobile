import { PuntajeService } from './../../services/puntaje-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the FinalizadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finalizado',
  templateUrl: 'finalizado.html',
  providers: [PuntajeService]
})
export class FinalizadoPage
{

  storage: any;
  public categoria;
  preguntas: any;
  formData: any;

  public juegofinalizado =
  {
    Finalizado: "",
    IdCategoria: "",
    Juego: "",
    PreguntaEstadistica: new Array(),
    PuntajeTotal: "",
    Usuario: "",
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpClient,
              private puntajeService: PuntajeService)
  {
    this.categoria = JSON.stringify(navParams.data.Categoria);
    this.storage = localStorage.getItem('userMobile');
    this.formData = new FormData();
    let headers = new Headers();
    let parse = JSON.parse(this.storage);
    let usuarioId = parse.UsuarioId;
    let tokenId = parse.Token;
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    this.formData.append('contenido', this.categoria);
    this.formData.append('UsuarioId', usuarioId);
    this.formData.append('Token', tokenId);
    this.puntajeService.scoreBoard(this.formData)
    .subscribe(res =>
    {
      let data = res.json();
      this.juegofinalizado.Finalizado = data.Result.Finalizado;
      this.juegofinalizado.IdCategoria = data.Result.IdCategoria;
      this.juegofinalizado.Juego = data.Result.Juego;
      this.juegofinalizado.PuntajeTotal = data.Result.PuntajeTotal;
      this.juegofinalizado.Usuario = data.Result.Usuario;
      this.juegofinalizado.PreguntaEstadistica = data.Result.PreguntaEstadistica;

      console.log(data.Result);
      console.log(this.juegofinalizado);
    });
  }
  //Para volver al HOME
    toHome()
    {
      this.navCtrl.setRoot(HomePage);
    }
  }
