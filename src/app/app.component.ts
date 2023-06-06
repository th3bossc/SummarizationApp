import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
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

  
  constructor(private primengConfig: PrimeNGConfig, private themeChanger : ThemeService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  toggleTheme(theme : string) {
    this.themeChanger.switchTheme(theme);
  }
}
