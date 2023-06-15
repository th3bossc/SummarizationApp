import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { ApiCallService } from '../Services/api-call.service';
import { Message } from 'primeng/api';
import { Clipboard } from '@angular/cdk/clipboard';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { QnaComponent } from '../qna/qna.component';
@Component({
  selector: 'app-video-summary',
  templateUrl: './video-summary.component.html',
  styleUrls: ['./video-summary.component.scss']
})
export class VideoSummaryComponent implements OnInit {
  reactiveForm : FormGroup;
  apiData : {'video_id' : string, 'title' : string, 'summary'  : string} = null;
  displayProgressBar : boolean = false;
  errorMessage : Message[] = null;
  @Input('modelAwake') modelAwake : boolean;

  constructor(private apiService : ApiCallService, private clipboard : Clipboard, public infoDialog : DialogService) {}

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      UrlField : new FormControl(null, [Validators.required, this.verifyYOutubeUrl])
    });

    this.apiData = null;
  }

  verifyYOutubeUrl(UrlField : FormControl){
    if (UrlField.value === null || UrlField.value === "")
      return {notYoutubeUrl : true};
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = UrlField.value.match(regExp);
    if (match && match.length >= 7 && match[7].length == 11) 
      return null;
    else 
      return {notYoutubeUrl : true};
  }


  onSubmit() : void {
    this.displayProgressBar = true;
    this.apiService.getVideoData(this.reactiveForm.value['UrlField']).subscribe((data) => {
      this.apiService.apiResponse = data;
      this.apiData = data;
      this.errorMessage = null;
      this.displayProgressBar = false;
    },
    (error) => {
      this.apiService.apiResponse = null;
      this.errorMessage = [{severity : 'error', summary : 'error', detail : error['error']['error']}];
      this.displayProgressBar = false;
    }); 
    this.reactiveForm.reset();
  }

  onCopy() {
    this.clipboard.copy(this.apiData['summary']);
  }


}
