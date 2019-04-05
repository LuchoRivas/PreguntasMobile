import { CategoriaService } from './../../services/categoria-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { PreguntaPage } from '../pregunta/pregunta';
import { CamaraPage } from '../camara/camara';

@IonicPage()
@Component({
  selector: 'page-jugar',
  templateUrl: 'jugar.html',
  providers:[CategoriaService]
})
export class JugarPage
{

  //Lista de categorias

  lista: any;

  private preguntaPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpClient,
              private categoriaService: CategoriaService)
  {
    this.preguntaPage = PreguntaPage;
    this.categoriaService.loadCategorias()
    .subscribe(res =>
    {
      //.lista = data.Result;
      let data = res.json();
      this.lista = data.Result;
      console.log(res);
    });
  }

  cargarCategoria(cat)
  {
    //Al tocar el boton de la categoria
    console.log(cat);
    //Busca la pregunta a partir de la categoria
    this.navCtrl.push(this.preguntaPage, {categoriaId: cat.Id, categoria: cat.Nombre});
  }


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad JugarPage');
  }
  // camara
  camara()
  {
    this.navCtrl.push(CamaraPage);
  }
}
