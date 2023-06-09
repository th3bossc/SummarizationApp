import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { ApiCallService } from './Services/api-call.service';
import { ThemeService } from './Services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation : ViewEncapsulation.None 
})
export class AppComponent implements OnInit {
  title = 'SummarizationApp';
  online : Message[] = null;
  catchPhrase : string = "";
  constructor(private primengConfig: PrimeNGConfig, private themeChanger : ThemeService, private apiService : ApiCallService, private messageService : MessageService) {}

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


  ngOnInit() {
    this.themeChanger.OnStartUp();
    this.primengConfig.ripple = true;
    this.apiService.checkOnline().subscribe((data) => {
      console.log('yayy');
      this.online = [{ severity: 'success', summary: 'Success', detail: 'Backend Server online!' }];
    },
    (error) => {
      console.log(error);
      this.online = [{ severity: 'warn', summary: 'Warning', detail: 'To preserve data, backend server is currently in powered off and might take 10-30 seconds to re-initiate' }];
    })
    this.typeWriterAnimation();
  }

  toggleTheme(theme : string) {
    this.themeChanger.switchTheme(theme);
  }
}
