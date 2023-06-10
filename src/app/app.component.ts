import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { ApiCallService } from './Services/api-call.service';
import { ThemeService } from './Services/theme.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InformationComponent } from './information/information.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation : ViewEncapsulation.None 
})
export class AppComponent implements OnInit {
  title = 'RapidRecap';
  online : Message[] = null;
  catchPhrase : string = "";
  modelChecked : boolean = false;
  modelAwake : boolean = false;
  ref : DynamicDialogRef;

  constructor(
    private primengConfig: PrimeNGConfig, 
    private themeChanger : ThemeService, 
    private apiService : ApiCallService, 
    private messageService : MessageService,
    public infoDialog : DialogService
  ) {}

  typeWriterAnimation() {
    this.catchPhrase = "";
    const letterArray = ['U', 'n', 'c', 'o', 'v', 'e', 'r', ' ', 't', 'h', 'e', ' ', 'E', 's', 's', 'e', 'n' ,'t' ,'i', 'a', 'l', 's', ',', ' ', 'E', 'f', 'f', 'o', 'r', 't', 'l', 'e', 's', 's', 'l', 'y', '.'];
    let i = 0;
    const loop = () => {
      setTimeout(() => {
        if (i < letterArray.length) {
          this.catchPhrase += letterArray[i++];
          loop();
        }
      }, 50);
    };
    loop();
  }

  modelRunning() {
    this.apiService.checkOnline().subscribe((data) => {
      this.online = [{ severity: 'success', summary: 'Success', detail: 'AI model recharged, rebooted, and ready to tackle your queries with zest!' }];
      this.modelChecked = true;
      this.modelAwake = true;
    },
    (error) => {
      console.log(error);
      if (this.modelChecked == false) {
        this.online = [{ severity: 'warn', summary: 'Oops!', detail: "The AI model took a nap due to inactivity, it's recharging it's batteries and will be online shortly!"}];
        this.modelChecked = true;
        setTimeout(() => this.modelRunning(), 30000);
      }
      else  
        this.online = [{ severity : 'error', summary : 'Sorry!', detail : "The AI model has taken an unscheduled vacation, enjoying a well-deserved break. Stay tuned!"}]
    })
  }

  ngOnInit() {
    this.themeChanger.OnStartUp();
    this.primengConfig.ripple = true;
    this.modelChecked = false;
    this.modelRunning();
    this.typeWriterAnimation();
  }

  toggleTheme(theme : string) {
    this.themeChanger.switchTheme(theme);
  }

  showInfo() {
    this.ref = this.infoDialog.open(InformationComponent, {header : "About the app...", width : "90%"})
  }
}
