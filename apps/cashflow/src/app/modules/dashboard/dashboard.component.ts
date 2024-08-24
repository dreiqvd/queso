import { Component } from '@angular/core';

import { ExpensesTableComponent } from './expenses-table/expenses-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ExpensesTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
