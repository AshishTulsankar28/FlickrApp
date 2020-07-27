import { Component, OnInit, NgModule } from '@angular/core';
import {FlickrService} from '../flickr.service';
import {photo} from '../models/flickerResp';
import {AppConstant} from '../models/AppConstant';

import { combineLatest } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyModalComponent } from '../my-modal/my-modal.component';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  photos:Array<photo>;
  display:boolean=false;
  config={maxSize:0,itemsPerPage:0,currentPage:1,totalItems:0};
  curGalleryId:string;

  constructor(private flickerService: FlickrService,
    public dialog: MatDialog) { 

  }

  getPhotoFromFlicker=(curPage:number,galleryId:string):void=>{

    this.flickerService.getPhotos(curPage,galleryId).subscribe( response => {
    if(response && response.stat=="ok"){
    this.display=true;
    combineLatest(response.photos.photo.map(photo=>{
      photo.imgUrl="https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
      photo.uploadDate=new Date(photo.dateupload*1000).toLocaleString();
    })
    );
    
    this.photos=response.photos.photo;
    this.config.maxSize=response.photos.pages;
    this.config.totalItems=response.photos.total;
    this.config.itemsPerPage=response.photos.perpage;
    }
  }, error => {
    console.log(error);
  });

}

  ngOnInit(): void {
    this.curGalleryId=AppConstant.FOOD_GALLERY;
    this.getPhotoFromFlicker(this.config.currentPage,this.curGalleryId);
  }

  pageChanged(pageNo:number) {
    this.config.currentPage=pageNo;
    this.getPhotoFromFlicker(this.config.currentPage,this.curGalleryId);
}

openDialog(curPhoto:photo): void {
  const dialogRef = this.dialog.open(MyModalComponent, {
    width: '250px',
    data: {title:curPhoto.title,comment:curPhoto.comment,rating:curPhoto.rating,commentBy:curPhoto.commentBy}
  });

  dialogRef.afterClosed().subscribe(modalResponse => {
    if(modalResponse){
      curPhoto.rating=modalResponse.rating;
      curPhoto.comment=modalResponse.comment;
      curPhoto.commentBy=modalResponse.commentBy;
    }
  });
}

navigateTo(navIndex:number):void{
 /**
  * TODO 1. Food 2. Breakfast 3. Nature
  * Reset Gallery Id, Reset current page index, Call API
  */
  //Gallery switch
  switch(navIndex){
    case 1:
      this.curGalleryId=AppConstant.FOOD_GALLERY;
    break;
    case 2:
      this.curGalleryId=AppConstant.BREAKFAST_GALLERY;
    break;
    case 3:
      this.curGalleryId=AppConstant.NATURE_GALLERY;
    break;
    case 4:
      this.curGalleryId=AppConstant.SUMMER_GALLERY;
    break;
    case 5:
      this.curGalleryId=AppConstant.COMET_GALLERY;
    break;
    case 6:
      this.curGalleryId=AppConstant.WILDLIFE_GALLERY;
    break;
    default:
      this.curGalleryId=AppConstant.FOOD_GALLERY;
    break;
  }
  //page switch
  this.config.currentPage=1;
  //call API
  this.getPhotoFromFlicker(1,this.curGalleryId);
}

}
