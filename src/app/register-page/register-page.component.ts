import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user-service.service';
import { SnackBarComponent } from '../SnackBar/snackbar.component';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  constructor(private service: UserService) {}

  loader: boolean = false;
  router: Router = inject(Router);
  snackBar = inject(SnackBarComponent);
  captain: string = '';
  captainid: string = '';
  tm2: string = '';
  tm2id: string = '';
  tm3: string = '';
  tm3id: string = '';
  tm4: string = '';
  tm4id: string = '';
  errorPresent: boolean = false;
  errorMessage: string = '';
  apiResponse: any;
  userEmail: any = localStorage.getItem('email') || "Lovely Player!";

  async submitForm(event: any) {
    event.preventDefault();
    if (
      !this.captain ||
      !this.captainid ||
      !this.tm2 ||
      !this.tm2id ||
      !this.tm3 ||
      !this.tm3id ||
      !this.tm4 ||
      !this.tm4id
    ) {
      this.errorMessage = 'Please fill all the fields';
      this.snackBar.openSnackBar(this.errorMessage, 'OK');
      return;
    }

    if (
      this.tm2id.length < 9 ||
      this.tm3id.length < 9 ||
      this.tm4id.length < 9 ||
      this.captainid.length < 9
    ) {
      this.errorMessage = 'Please enter valid BGMI ID';
      this.snackBar.openSnackBar(this.errorMessage, 'OK');
      return;
    }

    let team = {
      captain: {
        name: this.captain,
        id: this.captainid,
      },
      tm2: {
        name: this.tm2,
        id: this.tm2id,
      },
      tm3: {
        name: this.tm3,
        id: this.tm3id,
      },
      tm4: {
        name: this.tm4,
        id: this.tm4id,
      },
      email: localStorage.getItem('email'),
    };

    let response = this.createTeam(team);
    response.subscribe(
      (response) => {
        this.apiResponse = response;
      },
      (error) => {
        console.log(error);
      }
    );
    this.loader = true;
    setTimeout(() => {
      this.errorMessage = '';
      this.snackBar.openSnackBar(this.apiResponse.message, 'OK');
      if (this.apiResponse.status === 201) {
        this.router.navigate(['/user-payment']);
      }
      this.loader = false;
    }, 1500);
  }

  resetFields(): void {
    this.captain = '';
    this.captainid = '';
    this.tm2 = '';
    this.tm2id = '';
    this.tm3 = '';
    this.tm3id = '';
    this.tm4 = '';
    this.tm4id = '';
  }

  createTeam(teamData: any) {
    return this.service.createTeam(teamData);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loginToken') ? true : false;
  }

  ngOnInit(): void {
    this.loader = true;
    if (!this.isLoggedIn()) {
      this.snackBar.openSnackBar('Please Login to continue..', 'OK');
      this.router.navigate(['/login']);
    }
    setTimeout(() => {
      this.loader = false;
    }, 1500);
  }
}
