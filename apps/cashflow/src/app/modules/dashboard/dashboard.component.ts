import { Component } from '@angular/core';

import { DashboardExpensesComponent } from './dashboard-expenses/dashboard-expenses.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardExpensesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
