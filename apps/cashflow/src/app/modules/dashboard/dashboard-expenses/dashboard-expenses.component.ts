import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { take } from 'rxjs';

import { QsOrdinalPipe } from '@queso/common/pipes';
import { QsTabGroupDirective } from '@queso/ui-kit/tabs';

import { Expense } from '../../../models';
import { ExpenseService } from '../../../services';

@Component({
  selector: 'app-dashboard-expenses',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CurrencyPipe,
    MatTableModule,
    MatTabsModule,
    QsOrdinalPipe,
    QsTabGroupDirective,
  ],
  templateUrl: './dashboard-expenses.component.html',
  styleUrl: './dashboard-expenses.component.scss',
})
export class DashboardExpensesComponent {
  private readonly expenseService = inject(ExpenseService);

  readonly tblColumns = [
    'name',
    'amount',
    'dueDate',
    'lastPaymentDate',
    'paymentAccount',
    'isPaid',
    'action',
  ];
  readonly period1ExpensesDataSource = new MatTableDataSource<IExpenseRow>();
  readonly period2ExpensesDataSource = new MatTableDataSource<IExpenseRow>();
  readonly selectedPeriodIndex = new Date().getDate() > 15 ? 0 : 1;

  expenses: Expense[] = [];

  constructor() {
    afterNextRender(() => {
      this.expenseService
        .getExpenses()
        .pipe(take(1))
        .subscribe((expenses) => {
          const data = expenses.sort((a, b) => b.amount - a.amount);
          this.period1ExpensesDataSource.data = this.getPeriodExpenses(data, 1);
          this.period2ExpensesDataSource.data = this.getPeriodExpenses(data, 2);
        });
    });
  }

  private getPeriodExpenses(data: Expense[], period: number): IExpenseRow[] {
    return data
      .filter((e) => e.period === period)
      .map((e) => this.mapExpenseToRow(e));
  }

  private mapExpenseToRow(expense: Expense): IExpenseRow {
    const {
      name,
      amount,
      paymentDay,
      lastPaymentDate,
      isPaid,
      paymentAccount,
    } = expense;
    return {
      name,
      amount,
      dueDate: paymentDay,
      lastPaymentDate: lastPaymentDate?.toDateString() ?? 'N/A',
      paymentAccount,
      isPaid: !!isPaid,
      action: 'Pay',
    };
  }
}

interface IExpenseRow {
  name: string;
  amount: number;
  dueDate: number;
  lastPaymentDate: string;
  paymentAccount: string;
  isPaid: boolean;
  action: string;
}
