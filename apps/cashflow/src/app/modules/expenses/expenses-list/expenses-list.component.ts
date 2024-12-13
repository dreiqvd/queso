import { NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { take } from 'rxjs';

import { QsTabGroupDirective } from '@queso/ui-kit/tabs';

import { Expense } from '../../../models';
import { ExpenseService } from '../../../services';

import { ExpensesTableComponent } from './expenses-table/expenses-table.component';

@Component({
  selector: 'app-expenses-list',
  imports: [
    NgTemplateOutlet,
    MatTabsModule,
    MatButtonModule,
    QsTabGroupDirective,
    ExpensesTableComponent,
  ],
  templateUrl: './expenses-list.component.html',
  styles: `
    .table-heading {
      --mdc-filled-button-container-height: 36px;
      --mdc-filled-button-label-text-color: white;

      width: calc(100% - 328px);
    }
  `,
})
export class ExpensesListComponent {
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

  markAllAsUnpaid(): void {
    const expenses =
      this.selectedPeriodIndex === 0
        ? this.period1Expenses
        : this.period2Expenses;

    this.expenseService
      .bulkUpdate(
        expenses.map((d) => d.id as string),
        { isPaid: false }
      )
      .subscribe(() => {
        expenses.forEach((d) => (d.isPaid = false));
        if (this.selectedPeriodIndex === 0) {
          this.period1Expenses = [...expenses];
        } else {
          this.period2Expenses = [...expenses];
        }
      });
  }
}
