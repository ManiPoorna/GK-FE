import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../Services/user-service.service';
import { SnackBarComponent } from '../SnackBar/snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent implements OnInit {
  snackBar = inject(SnackBarComponent);
  service = inject(UserService);
  router: Router = inject(Router);
  isRegistered: boolean = false;
  name: string = '';
  mobile: string = '';
  errorMessage!: string;
  loader: boolean = false;
  apiResponse: any;
  teamData!: any;
  entryFee: any = 50;
  tournamentDetails: any = '';
  feeData: any;
  tournamentDetailsExists: boolean = false;

  sendRequest() {
    this.loader = true;
    if (!this.name.trim() || !this.mobile.trim()) {
      this.errorMessage = 'Please enter Name & Mobile Number';
      this.snackBar.openSnackBar(this.errorMessage, 'OK');
      this.loader = false;
      return;
    }

    let request = {
      name: this.name,
      mobile: this.mobile,
      isApproved: false,
    };

    let response = this.sendConfirmationRequest(request);
    response.subscribe(
      (response) => {
        this.apiResponse = response;
        this.loader = false;
      },
      (error) => {
        console.log(error);
      }
    );

    setTimeout(() => {
      this.snackBar.openSnackBar(this.apiResponse.message, 'OK');
      if (this.apiResponse.status === 201) {
        this.isRegistered = true;
        localStorage.setItem('isRegistered', 'true');
      }
    }, 1500);
  }

  sendConfirmationRequest(requestData: any) {
    return this.service.sendConfirmationRequest(requestData);
  }

  ngOnInit(): void {
    if (!localStorage.getItem('loginToken')) {
      this.snackBar.openSnackBar('Please Login to continue...', 'OK');
      this.router.navigateByUrl('/login');
      return;
    }
    if (localStorage.getItem('isRegistered') === 'true') {
      this.isRegistered = true;
    }
    this.loader = true;
    let response = this.getTeamDetails();
    response.subscribe((team) => {
      this.teamData = team;
      // console.log(this.teamData)
      if (this.teamData.data === null) {
        this.snackBar.openSnackBar(
          'No team found!, Plase register Your Team!',
          'OK'
        );
        localStorage.setItem('isRegistered', 'false');
        this.router.navigateByUrl('/register-team');
      }
    });

    let tournamentResponse = this.getTournamentDetails();
    tournamentResponse.subscribe(
      (details) => {
        this.tournamentDetails = details;
        if (this.tournamentDetails.response.length > 0) {
          this.tournamentDetailsExists = true;
        }
        // console.log(this.tournamentDetails)
      },
      (error) => {
        this.tournamentDetailsExists = false;
        console.log(error);
      }
    );

    let feeResponse = this.getRagistrationFee();
    feeResponse.subscribe((data) => {
      this.feeData = data;
    });
    console.log('Fee Data => ', this.feeData);
    this.entryFee = 0;

    setTimeout(() => {
      this.entryFee = this.feeData.response.price || 50;
      this.loader = false;
    }, 1500);
  }

  getTeamDetails() {
    let email = localStorage.getItem('email');
    return this.service.getPersonalRegisteredTeam(email);
  }

  getTournamentDetails() {
    return this.service.getTournamentDetails();
  }

  getRagistrationFee() {
    return this.service.getRegistrationFee();
  }

  showTeamDetails() {
    localStorage.setItem("isRegistered", 'true')
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    })
  }
}
