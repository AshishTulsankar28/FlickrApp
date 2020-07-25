import { Component, OnInit, NgModule } from '@angular/core';
import {FlickrService} from '../flickr.service';
import {FlickerResp,photo} from '../models/flickerResp';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  //flickerResponse: FlickerResp;
  photos:Array<photo>;
  display:boolean=false;
  config={maxSize:0,itemsPerPage:0,currentPage:1,totalItems:0};

  constructor(private flickerService: FlickrService) { 

  }

  getPhotoFromFlicker=(curPage:number):void=>{

    this.flickerService.getPhotos(curPage).subscribe( response => {
    this.display=true;
    combineLatest(response.photos.photo.map(photo=>{
      photo.imgUrl="https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
      photo.uploadDate=new Date(photo.dateupload*1000).toLocaleString();
      photo.comment="Display comment";
      photo.commentBy="Comment By";
    })
    );
    
    this.photos=response.photos.photo;
    this.config.maxSize=response.photos.pages;
    this.config.totalItems=response.photos.total;
    this.config.itemsPerPage=response.photos.perpage;
    //this.flickerResponse=response;
    //console.log("config",this.config," photos ",this.photos);
  }, error => {
    console.log(error);
  });

}

  ngOnInit(): void {
    this.getPhotoFromFlicker(this.config.currentPage);
  }

  pageChanged(pageNo:number) {
    this.config.currentPage=pageNo;
    this.getPhotoFromFlicker(this.config.currentPage);
}

}
