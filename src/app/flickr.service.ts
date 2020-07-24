import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { FlickerResp } from './models/flickerResp';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  flickerUrl = 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=516405bbd26959c06a7098c595aacd8c&gallery_id=66911286-72157655899998382&format=json&nojsoncallback=1';
  constructor(private http: HttpClient) { }
  getPhotos(): Observable<FlickerResp> {
    return this.http.get<FlickerResp>(this.flickerUrl);
  }
}
