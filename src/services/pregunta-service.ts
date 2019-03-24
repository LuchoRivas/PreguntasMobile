import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Entorno } from '../models/urlconfig';
import { Http, Headers, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

@Injectable()
export class PreguntaService
{
    private headers = new Headers();

    constructor(private entorno: Entorno, public httpClient: HttpClient, public http:Http)
    {
        this.headers.append("Content-Type", "application/x-www-form-urlencoded");
    }

    preguntarGet(model:any) : Observable<Response>
    {
        let url = this.entorno.url + 'Jugar/ComenzarAJugarMobile/' + model;
        return this.http.get(url);
    }

    pregutarPost(model:FormData) : Observable<Response>
    {

      let url = this.entorno.url + 'Jugar/RespuestaPregunta';
      let options = this.generateOptions();
      var headers = new Headers();
      headers.append("Accept", "/");
      headers.append("Content-Type", "application/json");
      const requestOptions = new RequestOptions({headers: headers});
      return this.http.post(url, model);
    }

    generateOptions() : RequestOptionsArgs
    {
        let options = new RequestOptions({ headers : this.headers});
        return options
    }
}
