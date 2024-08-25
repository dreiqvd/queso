import { afterNextRender, Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { take } from 'rxjs';

import { QsTabGroupDirective } from '@queso/ui-kit/tabs';

import { Expense } from '../../../models';
import { ExpenseService } from '../../../services';

import { ExpensesTableComponent } from './expenses-table/expenses-table.component';

@Component({
  selector: 'app-dashboard-expenses',
  standalone: true,
  imports: [MatTabsModule, QsTabGroupDirective, ExpensesTableComponent],
  templateUrl: './dashboard-expenses.component.html',
})
export class DashboardExpensesComponent {
  private readonly expenseService = inject(ExpenseService);

  readonly selectedPeriodIndex = new Date().getDate() > 15 ? 0 : 1;
  period1Expenses: Expense[] = [];
  period2Expenses: Expense[] = [];

  expenses: Expense[] = [];

  constructor() {
    afterNextRender(() => {
      this.expenseService
        .getExpenses()
        .pipe(take(1))
        .subscribe((expenses) => {
          const data = expenses.sort((a, b) => b.amount - a.amount);
          this.period1Expenses = data.filter((d) => d.period === 1);
          this.period2Expenses = data.filter((d) => d.period === 2);
        });
    });
  }
}
