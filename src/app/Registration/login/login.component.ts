import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import cryptoRandomString from 'crypto-random-string';
import { UserService } from 'src/app/Services/user-service.service';
import { SnackBarComponent } from 'src/app/SnackBar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  snackBar = inject(SnackBarComponent)
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService : UserService,
  ) {}
  email: string= ''
  password: string = '';
  loader: boolean = false;
  errorMessage = '';
  apiResponse!: any;

  async submitForm(event: any) {
    this.loader = true
    event.preventDefault();
    if (!this.email.trim() || !this.password.trim()) {
      debugger
      this.errorMessage = 'Please fill all the fields';
      this.snackBar.openSnackBar(this.errorMessage, 'OK');
      this.loader = false;
      return;
    }

    let response = this.loginUser({
      email: this.email,
      password: this.password,
    });
    (await response).subscribe((response) => {
      this.apiResponse = response;
      console.log(this.apiResponse)
    }, (error) => {
      console.log(error)
    })
    setTimeout(() => {
      this.snackBar.openSnackBar(this.apiResponse.response.message,"OK");
      this.loader = false;
      if (this.apiResponse.response.status === 200) {
        const loginToken = cryptoRandomString({
          length: 36,
          type: 'alphanumeric',
        });
        localStorage.setItem('loginToken', loginToken);
        localStorage.setItem('email', this.email);
        this.router.navigate(['/register-team']);
      }
    }, 1500);
  }

  async loginUser(data: any) {
    return this.userService.loginUser(data);
  }

  navigateSignup() {
    this.loader = true
    setTimeout(() => {
      this.router.navigate(['/signup']);
      this.loader= false
    },1500)
  }


  ngOnInit(): void {
    if (localStorage.getItem('loginToken')) {
      this.router.navigateByUrl("/register-team")
    }
  }


}
