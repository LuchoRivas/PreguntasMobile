import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',
})
export class CamaraPage
{

  contenidoFoto;


  constructor(
    private camera: Camera,
    private toastCtrl: ToastController
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
