import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, effect, input, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { QsOrdinalPipe } from '@queso/common/pipes';
import { QsIconComponent } from '@queso/ui-kit/icon';
import { Expense } from 'apps/cashflow/src/app/models';

@Component({
  selector: 'app-expenses-table',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatSortModule,
    QsOrdinalPipe,
    QsIconComponent,
  ],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.scss',
})
export class ExpensesTableComponent {
  @ViewChild(MatSort) sort!: MatSort;

  expenses = input.required<Expense[]>();

  readonly tblColumns = [
    'name',
    'amount',
    'dueDate',
    'paymentAccount',
    'lastPaymentDate',
    'isPaid',
    'action',
  ];
  tblDataSource = new MatTableDataSource<IExpenseRow>();

  constructor() {
    effect(() => {
      this.tblDataSource.data = this.expenses().map(this.mapExpenseToRow);
      this.tblDataSource.sort = this.sort;
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
      lastPaymentDate,
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
  lastPaymentDate: Date | undefined;
  paymentAccount: string;
  isPaid: boolean;
  action: string;
}
