import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar';

import { BudgetsListComponent } from './budgets-list/budgets-list.component';

@Component({
  selector: 'app-budgets',
  imports: [NavbarComponent, BudgetsListComponent],
  templateUrl: './budgets.component.html',
})
export class BudgetsComponent {}
