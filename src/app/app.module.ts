import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components 
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './Registration/signup/signup.component';
import { LoginComponent } from './registration/login/login.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { ApproveButtonComponent } from './approve-button/approve-button.component';
import { LoaderComponent } from './loader/loader.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

// Ag Grid Module
import { AgGridModule } from 'ag-grid-angular';

// Routing Modules
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-team', component: RegisterPageComponent },
  { path: 'user-payment', component: PaymentPageComponent },
  { path: 'admin-dashboard', component: DashboardComponent },
  { path: 'admin-dashboard-requests', component: RequestsComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    RegisterPageComponent,
    DashboardComponent,
    RequestsComponent,
    LoaderComponent,
    PaymentPageComponent,
    PagenotfoundComponent,
    ApproveButtonComponent,
  ],
  imports: [
    BrowserModule,
    MatChipsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatSnackBarModule,
    AgGridModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
