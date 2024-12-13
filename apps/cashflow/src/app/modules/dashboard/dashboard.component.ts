import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar';

import { DashboardBankAccountsComponent } from './dashboard-bank-accounts/dashboard-bank-accounts.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, DashboardBankAccountsComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
