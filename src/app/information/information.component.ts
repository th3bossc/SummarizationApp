import { Component } from '@angular/core';
import { DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  constructor(public ref : DynamicDialogRef, public config : DynamicDialogConfig) {}

}
