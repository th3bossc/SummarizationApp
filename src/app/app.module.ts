import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AnimateModule } from 'primeng/animate';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoSummaryComponent } from './video-summary/video-summary.component';
import { FileSummaryComponent } from './file-summary/file-summary.component';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { ApiCallService } from './Services/api-call.service';
import { ThemeService } from './Services/theme.service';

@NgModule({
  declarations: [
    AppComponent,
    VideoSummaryComponent,
    FileSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FileUploadModule,
    MessagesModule,
    ToastModule,
    HttpClientModule,
    ProgressBarModule,
    PanelModule,
    RadioButtonModule,
    InputTextareaModule,
    AnimateModule,
    ToolbarModule,
    FieldsetModule
  ],
  providers: [
    MessageService, 
    ApiCallService, 
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
