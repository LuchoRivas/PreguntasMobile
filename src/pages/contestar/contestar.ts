import { PreguntaService } from './../../services/pregunta-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FinalizadoPage } from '../finalizado/finalizado';
import $ from 'jquery';

/**
 * Generated class for the ContestarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contestar',
  templateUrl: 'contestar.html',
  providers: [PreguntaService]
})

export class ContestarPage
{

  //Pantalla de la pregunta a contestar

  otraPregunta: any;
  public pregAContestar;
  respuestas : any [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpClient,
              private preguntaService: PreguntaService)
  {
    //Constructor de la pregunta con diferentes guids
    this.pregAContestar = navParams.data.Pregunta;
    //Constructor para las respuestas de la pregunta
    this.respuestas = navParams.data.Pregunta.RespuestaJuego;
  }
  //model de ids que se envia cuando se responde una pregunta
  public model =
  {
    JuegoId: "",
    PreguntaId: "",
    RespuestaId:""
  };

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ContestarPage');
    // if(this.lista != "OK")
    // {
    //   this.navCtrl.setRoot(FinalizadoPage);
    // }
    // let objCat = JSON.stringify(this.idCategoria);
    // this.usuario = localStorage.getItem("user");
    // var parse = JSON.parse(this.usuario);
    // var usuarioId = parse.Result.UserId;
    // var tokenId = parse.Result.Token;
    //Guid id = Newtonsoft.Json.JsonConvert.DeserializeObject<Guid>(this.Contenido);

    //this.http.get("http://localhost:49875/JugarMobile/GetPreguntas/?usuarioId=" + usuarioId + '&tokenId=' + tokenId + "&contenido="+ objCat)
  }

  //Cuando se presiona la respuesta toma el id de la respuesta y ejecuta esta funcion
  preguntaRespondida(id)
  {

    this.model.JuegoId = this.pregAContestar.JuegoId;
    this.model.PreguntaId = this.pregAContestar.PreguntaJuego.Id;
    this.model.RespuestaId = id;
    let readUserLocalStorage = localStorage.getItem('userMobile');
    let pepo = JSON.parse(readUserLocalStorage);
    let formData : FormData = new FormData();
    let usuario =
    {
      Token: pepo.Token,
      UsuarioId: pepo.UsuarioId
    }
    let respuesta =
    {
      JuegoId: this.model.JuegoId,
      PreguntaId: this.model.PreguntaId,
      RespuestaId: this.model.RespuestaId
    }
    var contenido = JSON.stringify(respuesta)
    formData.append('contenido', contenido);
    formData.append('usuarioId', usuario.UsuarioId);
    formData.append('Token', usuario.Token);
    if(id == this.pregAContestar.RespuestaCorrecta)
    {
      //$("#" + id).removeClass("btn-info").addClass("btn-success");
      $("#" + id).css("background-color", "#32db64");
    }
    else
    {
      //$("#" + id).removeClass("btn-info").addClass("btn-danger");
      //$("#" + this.pregAContestar.RespuestaCorrecta).removeClass("btn-info").addClass("btn-success");
      $("#" + id).css("background-color", "red");
      $("#" + this.pregAContestar.RespuestaCorrecta).css("background-color", "#32db64")
    }
    //var url = "http://localhost:63266/Jugar/RespuestaPregunta";
    //var test = this.model.JuegoId;
    //var contenido = "?UsuarioId="+usuario.UsuarioId+"&Token="+usuario.Token+"&contenido="+objStr;
    this.preguntaService.pregutarPost(formData)
    .subscribe( res =>
    {
      let data = res.json();
      this.otraPregunta = data.Result;
      this.model = data.model;
      console.log(this.otraPregunta);
      if(this.otraPregunta == "OK")
      {
        let objStr = JSON.stringify(this.model.JuegoId);
        var contenido = "?UsuarioId="+usuario.UsuarioId+"&Token="+usuario.Token+"&contenido="+objStr;
        // this.http.get("http://localhost:63266/Jugar/ComenzarAJugarMobile/"+this.model.JuegoId)
        this.preguntaService.preguntarGet(contenido)
          .subscribe( res =>
            {
              let data = res.json();
            if(data.Result == "Termino")
            {
              alert("Termino")
              this.navCtrl.setRoot(FinalizadoPage, {Categoria: this.model.JuegoId});
            }
            if(data.Result.JuegoId)
            {
              this.otraPregunta = data.Result;
              //this.navCtrl.push(ContestarPage, this.lista);
              console.log(this.otraPregunta)
              this.navCtrl.setRoot(this.navCtrl.getActive().component, {Pregunta: this.otraPregunta});
            }
          });
      }
    });
    console.log(id);
    console.log(this.model);
  }
}
