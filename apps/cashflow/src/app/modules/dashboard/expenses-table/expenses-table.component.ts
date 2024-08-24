import { CurrencyPipe } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { take } from 'rxjs';

import { QsOrdinalPipe } from '@queso/common/pipes';

import { Expense } from '../../../models';
import { ExpenseService } from '../../../services';

@Component({
  selector: 'app-expenses-table',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, QsOrdinalPipe],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.scss',
})
export class ExpensesTableComponent {
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
