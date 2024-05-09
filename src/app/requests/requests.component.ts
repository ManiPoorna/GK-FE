import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApproveButtonComponent } from '../approve-button/approve-button.component';



@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  loader: boolean = false;

  rowData = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'mobile', headerName: 'Mobile' },
    {
      field: 'isApproved',
      headerName: 'Approve / Decline',
      // cellRenderer: ApproveButtonComponent,
      cellRenderer: (params: any) => {
        const isApprovedData = params.data.isApproved;
        return `<app-approve-button [isApprovedData]="${isApprovedData}">${isApprovedData ? "Approved" : "Approve"}</app-approve-button>`;
      },
    },
  ];

  defaultColDefs = {
    flex: 1,
    filter: false,
    sortable: false,
  };

  gotoDashboard() {
    this.loader = true;

    setTimeout(() => {
      this.loader = false;
      this.router.navigate(['/admin-dashboard']);
    }, 1500);
  }

  async getRequests() {
    this.http
      .get<any>(
        'https://gk-gaming.onrender.com/api/gk/get-confirmation-requests'
      )
      .subscribe(
        (data) => {
          this.rowData = data.requests;
          // console.log('Row Data-> ', this.rowData);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit(): void {
    this.getRequests();
  }
}
