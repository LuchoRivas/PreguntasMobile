import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Entorno } from '../models/urlconfig';
import { Http, Headers, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

@Injectable()
export class LoginService
{
    private headers = new Headers();

    constructor(private entorno: Entorno, public http:Http)
    {
        this.headers.append("Content-Type", "application/x-www-form-urlencoded");
    }

    logear(model:any) : Observable<Response>
    {
        let url = this.entorno.url + 'Account/LoginMobile';
        let options = this.generateOptions();
        var headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        const requestOptions = new RequestOptions({headers: headers});
        return this.http.post(url, model, requestOptions);
    }


    register(model:any) : Observable<Response>
    {
        let url = this.entorno.url + 'Account/LoginMobile';
        let options = this.generateOptions();
        var headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        const requestOptions = new RequestOptions({headers: headers});
        return this.http.post(url, model, requestOptions);
    }

    generateOptions() : RequestOptionsArgs
    {
        let options = new RequestOptions({ headers : this.headers});
        return options
    }
}
