import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BarRatingModule } from "ngx-bar-rating";
import { AngularMaterialModule } from './angular-material.module';
import { MyModalComponent } from './my-modal/my-modal.component';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    MyModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BarRatingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
    ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[MyModalComponent]
})
export class AppModule { }
