import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfinitescrollPage } from './infinitescroll';

@NgModule({
  declarations: [
    InfinitescrollPage,
  ],
  imports: [
    IonicPageModule.forChild(InfinitescrollPage),
  ],
})
export class InfinitescrollPageModule {}
