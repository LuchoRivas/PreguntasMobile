export class UrlConfig
{
  public url : string;

  constructor()
  {
    //Binit
    //this.url = "http://192.168.10.63/";
    //Desktop
    //this.url = "http://192.168.0.10/";
    //Mobile
    this.url = "http://localhost/";
  }
}

export class Entorno
{
  //Binit
  //readonly url : string = "http://192.168.10.63/";
  //Desktop
  //readonly url : string = "http://192.168.0.10/";
  //Mobile
  readonly url: string = "http://localhost/";
}
