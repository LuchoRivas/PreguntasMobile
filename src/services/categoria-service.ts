import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Entorno } from '../models/urlconfig';
import { Http, Headers, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

@Injectable()
export class CategoriaService 
{
    private headers = new Headers();

    constructor(private entorno: Entorno, public httpClient: HttpClient, public http:Http)
    {
        this.headers.append("Content-Type", "application/x-www-form-urlencoded");
    }

    loadCategorias() : Observable<Response>
    {
        let url = this.entorno.url + 'Jugar/IndexMobile';
        return this.http.get(url);
    }

    generateOptions() : RequestOptionsArgs 
    {
        let options = new RequestOptions({ headers : this.headers});

        return options
    }
}