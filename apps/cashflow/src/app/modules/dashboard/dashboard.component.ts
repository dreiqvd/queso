import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar';

import { DashboardExpensesComponent } from './dashboard-expenses/dashboard-expenses.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardExpensesComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
