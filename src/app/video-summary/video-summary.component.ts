import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { ApiCallService } from '../Services/api-call.service';
@Component({
  selector: 'app-video-summary',
  templateUrl: './video-summary.component.html',
  styleUrls: ['./video-summary.component.scss']
})
export class VideoSummaryComponent implements OnInit {
  reactiveForm : FormGroup;
  apiData : {'title' : string, 'summary'  : string} = null;
  displayProgressBar : boolean = false;



  constructor(private apiService : ApiCallService) {}

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      UrlField : new FormControl(null, [Validators.required, this.verifyYOutubeUrl])
    });

    this.apiData = null;
  }

  noSpaceAllowed(control : FormControl) {
    console.log(control.value);
    if (control.value != null && control.value.indexOf(' ') != -1)
      return {noSpaceAllowed : true};
    return null;
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
    console.log(this.reactiveForm.value['UrlField']);
    this.displayProgressBar = true;
    this.apiService.getVideoData(this.reactiveForm.value['UrlField']).subscribe((data) => {
      this.apiService.apiResponse = data;
      this.apiData = data;
      this.displayProgressBar = false;
    }); 
    this.reactiveForm.reset();
  }

}
