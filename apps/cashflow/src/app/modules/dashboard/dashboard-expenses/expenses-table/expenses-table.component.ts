import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, effect, input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
    MatButtonModule,
    QsOrdinalPipe,
    QsIconComponent,
  ],
  templateUrl: './expenses-table.component.html',
  styles: `
    td {
      padding: 16px;
    }
  `,
})
export class ExpensesTableComponent {
  @ViewChild(MatSort) sort!: MatSort;

  expenses = input.required<Expense[]>();

  readonly tblColumns = [
    'name',
    'amount',
    'dueDate',
    'paymentAccount',
    'billingCycle',
    'lastPaymentDate',
    'isPaid',
    'action',
  ];
  tblDataSource = new MatTableDataSource<Expense>();

  constructor() {
    effect(() => {
      this.tblDataSource.sort = this.sort;
      this.tblDataSource.data = this.getTableSourceData();
    });
  }

  private getTableSourceData(): Expense[] {
    let data = this.expenses();

    // Filter out yearly subscriptions that are not yet due
    const currentMonth = new Date().getMonth();
    data = data.filter((d) => {
      if (d.billingCycle === 'yearly') {
        return new Date(d.dueDate as string).getMonth() === currentMonth;
      }

      return true;
    });

    return data.sort((a, b) => b.amount - a.amount);
  }
}