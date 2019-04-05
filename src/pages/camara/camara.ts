import { ArchivoService } from './../../services/archivo-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',
  providers: [ArchivoService]
})
export class CamaraPage
{

  contenidoFoto;


  constructor(
    private camera: Camera,
    private toastCtrl: ToastController,
    private archivoSevice:ArchivoService
  ) {}
  //Usa la camara para sacar una foto
  tomarFoto()
  {
    const options: CameraOptions =
    {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) =>
    {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.contenidoFoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) =>
    {
    // Handle error
      this.mostrarToast("Hubo un error con la camara");
    });

  }

  //Para obtener una foto de la galeria
  obtenerFoto(){
    const options: CameraOptions =
    {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) =>
    {
      this.contenidoFoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) =>
    {
    // Handle error
      this.mostrarToast("No se ha seleccionado la imagen");
    });
  }
subirImagen()
{
  let readUserLocalStorage = localStorage.getItem('userMobile');
  let pepo = JSON.parse(readUserLocalStorage);
  let formData : FormData = new FormData();
  let usuario =
  {
    Token: pepo.Token,
    UsuarioId: pepo.UsuarioId
  }
  // let respuesta =
  // {
  //   JuegoId: this.model.JuegoId,
  //   PreguntaId: this.model.PreguntaId,
  //   RespuestaId: this.model.RespuestaId
  // }
  //var contenido = JSON.stringify(respuesta);
  formData.append('contenido', this.contenidoFoto);
  formData.append('usuarioId', usuario.UsuarioId);
  formData.append('Token', usuario.Token);

  this.archivoSevice.archivoPost(formData)
    .subscribe( res =>
    {
      let data = res.json();
      console.log(data);
      // this.otraPregunta = data.Result;
      // this.model = data.model;
      // console.log(this.otraPregunta);
      // if(this.otraPregunta == "OK")
      // {
        //let objStr = JSON.stringify(this.model.JuegoId);
        var contenido = "?UsuarioId="+usuario.UsuarioId+"&Token="+usuario.Token+"&contenido="+this.contenidoFoto;
        // this.http.get("http://localhost:63266/Jugar/ComenzarAJugarMobile/"+this.model.JuegoId)
        // this.preguntaService.preguntarGet(contenido)
        //   .subscribe( res =>
        //     {
        //       let data = res.json();
        //       console.log(data);
            // if(data.Result == "Termino")
            // {
            //   alert("Termino")
            //   this.navCtrl.setRoot(FinalizadoPage, {Categoria: this.model.JuegoId});
            // }
            // if(data.Result.JuegoId)
            // {
            //   this.otraPregunta = data.Result;
            //   //this.navCtrl.push(ContestarPage, this.lista);
            //   console.log(this.otraPregunta)
            //   this.navCtrl.setRoot(this.navCtrl.getActive().component, {Pregunta: this.otraPregunta});
            // }
          //});
      //}
    });
  }

  mostrarToast(msg)
  {
    let toast = this.toastCtrl.create
    ({
      message: msg,
      duration: 3000,
      position: "bottom"
    })
    toast.present();
  }
}
