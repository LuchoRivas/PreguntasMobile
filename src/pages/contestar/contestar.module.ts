import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestarPage } from './contestar';

@NgModule({
  declarations: [
    ContestarPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestarPage),
  ],
})
export class ContestarPageModule {}
