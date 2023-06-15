import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QaApiCallService {

  constructor(private http : HttpClient) { }
  // apiUrl : string = "http://127.0.0.1:5000/";
  apiUrl : string = "https://Th3BossC-TranscriptApi.hf.space/";
  apiResponse : {'question' : string, 'answer' : string} = null;

  getVideoAnswers(question : string, video_id : string) {
    let formData : any = {'question' : question};
    return this.http.post(this.apiUrl + 'video_question_api/' + video_id, formData);
  }

  getFileAnswers(question : string, file_id : number) {
    let formData : any = {'question' : question};
    return this.http.post(this.apiUrl + 'file_question_api/' + file_id, formData);
  }

}
