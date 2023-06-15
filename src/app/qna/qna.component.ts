import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QaApiCallService } from '../Services/qa-api-call.service';

export interface questionChat {
  sent : boolean;
  content : string;
};

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.scss']
})
export class QnaComponent implements OnInit, AfterViewChecked{
  questionForm : FormGroup
  questions : questionChat[] = [];
  @Input('type') targetContent : {'type' : 'video', 'video_id' : string} | {'type' : 'file', 'file_id' : number};
  inputDisabled : boolean = false;
  @ViewChild('bottom') pageBottom : ElementRef;
  typing : boolean = false;


  constructor(private qnaApi : QaApiCallService) {}

  ngOnInit() {
    this.inputDisabled = false;
    this.questionForm = new FormGroup({
      question : new FormControl(null)
    })
  }

  ngAfterViewChecked() {        
    this.pageBottom.nativeElement.scrollTop = this.pageBottom.nativeElement.scrollHeight;        
  }


  onSubmit() {
    this.questions.push({sent : true, content : this.questionForm.value['question']});
    this.inputDisabled = true;
    this.typing = true;
    if (this.targetContent.type === 'video') {
      this.qnaApi.getVideoAnswers(this.questionForm.value['question'], this.targetContent.video_id).subscribe((data) => {
        this.typing = false;
        this.questions.push({sent : false, content : data['answer']});
        this.inputDisabled = false;
      });
    }
    else {
      this.qnaApi.getFileAnswers(this.questionForm.value['question'], this.targetContent.file_id).subscribe((data) => {
        this.typing = false;
        this.questions.push({sent : false, content : data['answer']});
        this.inputDisabled = false;
      });
    }
    this.questionForm.reset();
  }
  
  canInput() : {input : boolean} {
    return this.inputDisabled ? { input : false } : null;
  }
}

