import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user-service.service';
import { SnackBarComponent } from 'src/app/SnackBar/snackbar.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private snackBar: SnackBarComponent,
    private router: Router,
    private userService: UserService
  ) {}
  name: any;
  email: any;
  password: any;
  confirm_password: any;
  loader: any;
  errorMessage: any;
  apiResponse: any;

  resetFields() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirm_password = '';
  }

  async submitForm(event: any) {
    event.preventDefault();

    if (!this.name || !this.email || !this.password || !this.confirm_password) {
      this.errorMessage = 'Please fill all the fields';
      this.snackBar.openSnackBar(this.errorMessage, 'OK');
      return;
    }

    if (this.password !== this.confirm_password) {
      this.snackBar.openSnackBar('Password not matched..', 'OK');
      return;
    }

    this.loader = true;
    let user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    let response = this.signUpUser(user);
    (await response).subscribe(
      (response) => {
        this.apiResponse = response;
      },
      (error) => {
        console.log(error);
      }
    );
    setTimeout(() => {
      this.snackBar.openSnackBar(this.apiResponse.message, 'OK');
      if (this.apiResponse.status === 201) {
        this.resetFields();
        this.router.navigate(['/login']);
      }
      this.loader = false;
    }, 1500);
  }

  signUpUser(data: any) {
    return this.userService.createAccount(data);
  }

  navigateLogin() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.router.navigate(['/login']);
    }, 1500);
  }

  ngOnInit(): void {
    if (localStorage.getItem('loginToken')) {
      this.router.navigateByUrl('/register-team');
    }
  }
}
