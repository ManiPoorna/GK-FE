import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loader : boolean = false
  constructor(private router: Router) { }
  logout() {
    this.loader = true
    setTimeout(() => {
      this.loader = false
      localStorage.removeItem('loginToken')
      localStorage.removeItem('email')
      localStorage.removeItem('isRegistered');
      this.router.navigate(['login'])
    },1500)
  }
}

