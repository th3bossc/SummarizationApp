import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http : HttpClient) { }
  // apiUrl : string = "http://127.0.0.1:5000/";
  apiUrl : string = "https://Th3BossC-TranscriptApi.hf.space/";
  apiResponse : {'title' : string, 'summary' : string};


  checkOnline() {
    return this.http.get(this.apiUrl + 'online');
  }

  private getId(url : string) : string | boolean{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  
  getVideoData(video_url) : Observable<any> {
    const video_id = this.getId(video_url);
    return this.http.get(this.apiUrl + 'video_api/' + video_id);
  }


  postFileData(file, fileType) : Observable<any> {
    let formData : any;
    if (fileType === 'pdf' || fileType === 'txt') {
      formData = new FormData();
      formData.append('file', file, file.name);
    }
    else
      formData = {'text' : file}
    return this.http.post(this.apiUrl + 'file_api/' + fileType, formData);

  }

}
