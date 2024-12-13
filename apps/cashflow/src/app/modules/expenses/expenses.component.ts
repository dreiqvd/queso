import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar';

import { ExpensesListComponent } from './expenses-list/expenses-list.component';

@Component({
  selector: 'app-expenses',
  imports: [ExpensesListComponent, NavbarComponent],
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent {}
