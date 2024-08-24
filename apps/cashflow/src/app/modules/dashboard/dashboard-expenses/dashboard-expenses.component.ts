import { CurrencyPipe } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { take } from 'rxjs';

import { QsOrdinalPipe } from '@queso/common/pipes';

import { Expense } from '../../../models';
import { ExpenseService } from '../../../services';

@Component({
  selector: 'app-dashboard-expenses',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, QsOrdinalPipe],
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
  readonly tblDataSource = new MatTableDataSource<IExpenseRow>();

  expenses: Expense[] = [];

  constructor() {
    afterNextRender(() => {
      this.expenseService
        .getExpenses()
        .pipe(take(1))
        .subscribe((expenses) => {
          const data: IExpenseRow[] = expenses.map((e) =>
            this.mapExpenseToRow(e)
          );
          this.tblDataSource.data = data;
        });
    });
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
