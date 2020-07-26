import { Component, OnInit, NgModule } from '@angular/core';
import {FlickrService} from '../flickr.service';
import {FlickerResp,photo} from '../models/flickerResp';
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

  constructor(private flickerService: FlickrService,
    public dialog: MatDialog) { 

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

openDialog(curPhoto:photo): void {
  const dialogRef = this.dialog.open(MyModalComponent, {
    width: '250px',
    data: curPhoto
  });

  dialogRef.afterClosed().subscribe(res => {
    //console.log("response from pop up screen",res);
  });
}


}
