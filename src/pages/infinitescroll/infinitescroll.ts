import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';



@IonicPage()
@Component({
  selector: 'page-infinitescroll',
  templateUrl: 'infinitescroll.html',
})
export class InfinitescrollPage {

  data: any;
  users: string[];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restApi: RestApiProvider) 
  {
    this.getUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfinitescrollPage');
  }

  getUsers() 
  {
    this.restApi.getUsers(this.page)
       .subscribe(
         res => {
           this.data = res;
           this.users = this.data.data;
           this.perPage = this.data.per_page;
           this.totalData = this.data.total;
           this.totalPage = this.data.total_pages;
         },
         error =>  this.errorMessage = <any>error);
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    setTimeout(() => {
      this.restApi.getUsers(this.page)
         .subscribe(
           res => {
             this.data = res;
             this.perPage = this.data.per_page;
             this.totalData = this.data.total;
             this.totalPage = this.data.total_pages;
             for(let i=0; i<this.data.data.length; i++) {
               this.users.push(this.data.data[i]);
             }
           },
           error =>  this.errorMessage = <any>error);
  
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }
}
