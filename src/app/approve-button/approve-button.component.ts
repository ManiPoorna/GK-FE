import { Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-approve-button',
  templateUrl: './approve-button.component.html',
  styleUrls: ['./approve-button.component.css'],
})
export class ApproveButtonComponent implements ICellRendererAngularComp {
  @Input() isApprovedData!: boolean;

  agInit(params: any): void {}

  refresh(params: any): boolean {
    return true;
  }
}
