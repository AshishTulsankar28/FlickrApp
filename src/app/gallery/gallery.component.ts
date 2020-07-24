import { Component, OnInit, NgModule } from '@angular/core';
import {FlickrService} from '../flickr.service';
import {FlickerResp} from '../models/flickerResp';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  flickerResponse: FlickerResp;
  display:boolean=false;
  constructor(private flickerService: FlickrService) { }

  ngOnInit(): void {
    this.flickerService.getPhotos().subscribe( response => {
      this.display=true;
      combineLatest(response.photos.photo.map(photo=>{
        photo.imgUrl="https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
      })
      );
      this.flickerResponse=response;
    }, error => {
      console.log(error);
    });
  }

}
