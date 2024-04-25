import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { RequestsComponent } from './requests/requests.component';
import { RequestsPageComponent } from './pages/requests-page/requests-page.component';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentRouterComponent } from './pages/payment-router/payment-router.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'user-payment', component: PaymentPageComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-dashboard-requests', component: RequestsComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    AdminDashboardComponent,
    DashboardComponent,
    RequestsComponent,
    RequestsPageComponent,
    LoaderComponent,
    PaymentPageComponent,
    PaymentRouterComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
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
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
