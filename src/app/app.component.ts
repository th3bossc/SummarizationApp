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
  
  constructor(private primengConfig: PrimeNGConfig, private themeChanger : ThemeService, private apiService : ApiCallService, private messageService : MessageService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.apiService.checkOnline().subscribe((data) => {
      console.log('yayy');
      this.online = [{ severity: 'success', summary: 'Success', detail: 'Backend Server online!' }];
    },
    (error) => {
      console.log(error);
      this.online = [{ severity: 'warn', summary: 'Warning', detail: 'To preserve data, backend server is currently in powered off and might take 10-30 seconds to re-initiate' }];
    })
  }

  toggleTheme(theme : string) {
    this.themeChanger.switchTheme(theme);
  }
}
