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
        .list()
        .pipe(take(1))
        .subscribe((expenses) => {
          // Expenses that are paid on the 30th of the month (excluding 30th expenses).
          // Note: 31st expenses should be paid on 30th of the month and thus included for period 2
          this.period1Expenses = expenses.filter(
            (d) =>
              (d.paymentDay >= 1 && d.paymentDay <= 15) || d.paymentDay === 31
          );
          // Expenses that are paid on the 15th of the month (excluding 15th expenses).
          this.period2Expenses = expenses.filter(
            (d) => d.paymentDay >= 16 && d.paymentDay <= 30
          );
        });
    });
  }
}
