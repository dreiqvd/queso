import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar';

import { DashboardBankAccountsComponent } from './dashboard-bank-accounts/dashboard-bank-accounts.component';
import { DashboardSourceOfFundsComponent } from './dashboard-fund-sources/dashboard-fund-sources.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    NavbarComponent,
    DashboardBankAccountsComponent,
    DashboardSourceOfFundsComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
