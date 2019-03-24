import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Entorno } from "../models/urlconfig";

@Injectable()
export class PuntajeService
{
  constructor( private entorno : Entorno, public http: Http ){}

  scoreBoard(model:any)
  {
    var formData = model;
    var categoria = formData.get('contenido');
    var usuarioId = formData.get('UsuarioId')
    var tokenId = formData.get('Token')
    let url = this.entorno.url + 'Jugar/JuegoFinalizadoMobile/?usuarioId=' + usuarioId +"&Token=" + tokenId +"&contenido=" + categoria;
    return this.http.get(url, model);
  }
}
