import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiCallService } from '../Services/api-call.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-file-summary',
  templateUrl: './file-summary.component.html',
  styleUrls: ['./file-summary.component.scss']
})
export class FileSummaryComponent {
  textForm : FormGroup;
  fileType : string;
  displayProgressBar : boolean = false;
  
  apiData : {'title' : string, 'summary' : string} = null;

  constructor(private messageService : MessageService, private apiService : ApiCallService, private clipboard : Clipboard) {}

  ngOnInit() {
    this.textForm = new FormGroup({
      textField : new FormControl(null, [Validators.minLength(10000)])
    });
    this.fileType = 'direct_text';
    
    this.apiData = null;

  }

  onSubmitTextAreaData() {
    const text = this.textForm.value['textField'];
    this.displayProgressBar = true;
    this.apiService.postFileData(text, 'direct_text').subscribe((data) => {
      this.apiService.apiResponse = data;
      this.apiData = data;
      this.displayProgressBar = false;
    });
    this.textForm.reset();
  }


  onBasicUpload(event) {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  customUpload(event : {files : Blob[]}, fileInput) {
    this.apiService.postFileData(event.files[0], this.fileType).subscribe((data) => {
      console.log(data);
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    });
    fileInput.clear();
  }

  onCopy() {
    this.clipboard.copy(this.apiData['summary']);
  }
}
