import { Component } from '@angular/core';

import { Navbar } from '../../components/navbar';

import { BudgetsList } from './budgets-list/budgets-list.component';

@Component({
  selector: 'app-budgets',
  imports: [Navbar, BudgetsList],
  templateUrl: './budgets.component.html',
})
export class Budgets {}
