import { PreguntaService } from './../../services/pregunta-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ContestarPage } from '../contestar/contestar';
import { FinalizadoPage } from '../finalizado/finalizado';

/**
 * Generated class for the PreguntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pregunta',
  templateUrl: 'pregunta.html',
  providers:[PreguntaService]
})
export class PreguntaPage
{

  pregunta: any;
  private contestarPage;
  public categoria =
  {
    Id: "",
    Nombre: ""
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpClient: HttpClient,
              private preguntaService: PreguntaService)
  {
    this.categoria.Id = navParams.data.categoriaId;
    this.categoria.Nombre = navParams.data.categoria;
    this.contestarPage = ContestarPage;
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad PreguntaPage');
  }

  comenzar(id)
  {
    let readUserLocalStorage = localStorage.getItem('userMobile');
    let pepo = JSON.parse(readUserLocalStorage);
    let formData = new FormData();
    let usuario =
    {
      Token: pepo.Token,
      UsuarioId: pepo.UsuarioId
    }
    var idcategoria = this.navParams.get("categoriaId");
    let objStr = JSON.stringify(idcategoria);
    var contenido = "?UsuarioId="+usuario.UsuarioId+"&Token="+usuario.Token+"&contenido="+objStr;


    this.preguntaService.preguntarGet(contenido)
    .subscribe( res =>
    {
      let data = res.json();
      if(data.Result == "Termino")
      {
        //Si termino de contestar las preguntas muestra los resultados en Root
        this.navCtrl.setRoot(FinalizadoPage, { Categoria: this.categoria.Id });
      }
      if(data.Result.JuegoId)
      {
        //Siguiente pregunta a contestar
      this.pregunta = data.Result;
      this.navCtrl.push(this.contestarPage, {Pregunta: this.pregunta});
      }
      console.log(this.pregunta);
    });
    console.log(id);
  }
}
