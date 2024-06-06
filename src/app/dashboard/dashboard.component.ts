import { Component, OnInit, inject } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid-community'; // Column Definition Type Interface
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../SnackBar/snackbar.component';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loader: boolean = false;
  entryFee: any;
  tournamentDateAndTime: any = '';
  dataPassword: string = '';
  showConfirmationPopup: boolean = false;
  snackBar = inject(SnackBarComponent);
  apiResponse: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private service: UserService,
    private _snackBar: MatSnackBar
  ) {}
  rowData: any[] = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Captain',
      children: [
        { columnGroupShow: 'open', headerName: 'Name', field: 'captain.name' },
        { columnGroupShow: 'open', headerName: 'ID', field: 'captain.id' },
      ],
    },
    {
      headerName: 'Teammate 2',
      children: [
        { columnGroupShow: 'open', headerName: 'Name', field: 'tm2.name' },
        { columnGroupShow: 'open', headerName: 'ID', field: 'tm2.id' },
      ],
    },
    {
      headerName: 'Teammate 3',
      children: [
        { columnGroupShow: 'open', headerName: 'Name', field: 'tm3.name' },
        { columnGroupShow: 'open', headerName: 'ID', field: 'tm3.id' },
      ],
    },
    {
      headerName: 'Teammate 4',
      children: [
        { columnGroupShow: 'open', headerName: 'Name', field: 'tm4.name' },
        { columnGroupShow: 'open', headerName: 'ID', field: 'tm4.id' },
      ],
    },
  ];

  defaultColDefs = {
    flex: 1,
    filter: false,
    sortable: false,
  };

  getRegisteresTeams() {
    this.http
      .get<any>('https://gk-gaming.onrender.com/api/gk/get-registered-teams')
      .subscribe(
        (data) => {
          this.rowData = data.registeredTeams;
        },
        (error) => {
          return error;
        }
      );
  }

  deteleDbData() {
    this.loader = true;
    let confirmation = confirm('Are you sure you want to delete Data??');
    if (confirmation) {
      this.service.deleteDataInDB().subscribe((data) => {
        console.log(data);
      });
    }
    setTimeout(() => {
      this.snackBar.openSnackBar('Data Deleted Successfully', 'OK');
      this.loader = false;
    }, 1500);
  }

  gotoRequestPage() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.router.navigate(['/admin-dashboard-requests']);
    }, 1500);
  }

  gotoTournamentDetailsPage() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.router.navigate(['/send-tournament-details']);
    }, 1500);
  }
  giveAccess() {
    if (!this.dataPassword) {
      this.snackBar.openSnackBar('Please enter password', 'OK');
      return;
    }
    this.loader = true;
    if (this.dataPassword === 'Manipoorna@1717') {
      sessionStorage.setItem('hadAccess', 'true');
      this.showConfirmationPopup = false;
      this.getRegisteresTeams();
    } else {
      this.snackBar.openSnackBar('Worng Password', 'OK');
      this.loader = false;
    }
    setTimeout(() => {
      this.loader = false;
    }, 1500);
  }

  setDateAndTime(event: any) {
    this.tournamentDateAndTime = event.target.value;
  }

  sendTournamentDetails() {
    this.loader = true;
    let response = this.sendRequestTournamentDetails();
    response?.subscribe((res) => {
      this.apiResponse = res;
      this.loader = false;
    });
    setTimeout(() => {
      this.snackBar.openSnackBar(this.apiResponse.response.message, 'Ok');
    }, 1500);
  }

  sendRequestTournamentDetails() {
    let date = this.tournamentDateAndTime.split('T')[0];
    let time = this.tournamentDateAndTime.split('T')[1];
    if (!date || !time) {
      this.snackBar.openSnackBar('Please enter date and time', 'OK');
      return;
    }
    return this.service.sendTournamentDetails({ date, time });
  }

  deleteExistingTournamentDetails() {
    let confirmation = confirm(
      'Are you sure you want to delete existing Tournamnet details?'
    );
    if (!confirmation) return;
    let response = this.sendDeleteExistingTournamentDetails();
    response?.subscribe((res) => {
      this.apiResponse = res;
      localStorage.removeItem('isRegistered');
    });
    this.loader = true;
    setTimeout(() => {
      this.snackBar.openSnackBar(this.apiResponse.message, 'OK');
      this.loader = false;
    }, 1500);
  }

  sendDeleteExistingTournamentDetails() {
    return this.service.deleteExistingTournamentDetails();
  }

  setEntryFee() {
    if (isNaN(this.entryFee)) {
      this.snackBar.openSnackBar('Please enter valid amount', 'OK');
      return;
    }
    this.loader = true;
    let response = this.sendEntryFee(parseInt(this.entryFee));
    response?.subscribe((res) => {
      this.apiResponse = res;
    });
    setTimeout(() => {
      this.snackBar.openSnackBar(this.apiResponse.message +" "+ this.entryFee, 'OK');
      this.loader = false
    },1500)
  }

  sendEntryFee(price: any) {
    return this.service.sendRegistrationAmountDetails(price);
  }

  deleteRegistrationFeeDetails() {
    this.loader = true
    let reponse = this.sendDeleteReq();
    reponse?.subscribe((res) => {
      this.apiResponse = res;
    });
    
    setTimeout(() => {
      this.snackBar.openSnackBar(
        this.apiResponse.message,
        'OK'
      );
      this.loader = false;
    }, 1500);
  }
  sendDeleteReq() {
    return this.service.deleteRegistrationAmountDetails();
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('hadAccess')) {
      this.showConfirmationPopup = true;
    } else {
      this.getRegisteresTeams();
    }
  }
}
