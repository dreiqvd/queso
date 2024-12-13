import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, effect, inject, input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QsOrdinalPipe } from '@queso/common/pipes';
import { DialogService } from '@queso/ui-kit/dialog';
import { QsIconComponent } from '@queso/ui-kit/icon';

import { Expense, FirestoreResponseDate } from '../../../../models';
import { ExpenseService } from '../../../../services';
import { ExpenseFormComponent } from '../../../expenses';

@Component({
  selector: 'app-expenses-table',
  imports: [
    NgClass,
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    QsOrdinalPipe,
    QsIconComponent,
  ],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.scss',
})
export class ExpensesTableComponent {
  @ViewChild(MatSort) sort!: MatSort;

  private readonly expenseService = inject(ExpenseService);
  private readonly dialogService = inject(DialogService);

  expenses = input.required<TableExpense[]>();

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
  paymentAccounts: Array<{
    total: number;
    name: string;
  }> = [];
  totalExpenses = 0;

  constructor() {
    effect(() => {
      this.tblDataSource.sort = this.sort;
      const data = this.getTableSourceData();
      this.tblDataSource.data = data;
      this.paymentAccounts = data.reduce(
        (acc, curr) => {
          const account = acc.find((a) => a.name === curr.paymentAccount);
          if (account) {
            account.total += curr.amount;
          } else {
            acc.push({
              name: curr.paymentAccount,
              total: curr.amount,
            });
          }

          return acc;
        },
        [] as Array<{ total: number; name: string }>
      );

      this.computeTotalExpenses();
    });
  }

  private computeTotalExpenses(): void {
    const data = this.tblDataSource.data;
    this.totalExpenses = data.reduce((acc, curr) => acc + curr.amount, 0);
  }

  private getTableSourceData(): Expense[] {
    let data = this.expenses();

    // Filter out yearly expenses that are not yet due
    const currentMonth = new Date().getMonth();
    data = data.filter((d) => {
      if (d.billingCycle === 'yearly') {
        return new Date(d.dueDate as string).getMonth() === currentMonth;
      } else if (d.billingCycle === 'quarterly') {
        const dueMonths = this.getQuarterlyDueMonths(d.dueDate as string);
        return dueMonths.includes(currentMonth);
      } else {
        return true; // Monthly expenses are always displayed
      }
    });

    return data
      .sort((a, b) => b.amount - a.amount)
      .map((d) => ({
        ...d,
        isLoading: false,
        lastPaymentDate: d.lastPaymentDate
          ? new Date(
              (d.lastPaymentDate as FirestoreResponseDate).seconds * 1000
            )
          : undefined,
      }));
  }

  /** Compute the months a quarterly expense is paid */
  private getQuarterlyDueMonths(dueDate: string): number[] {
    const dueMonths: number[] = [];
    const startMonthIndex = new Date(dueDate).getMonth();

    for (let i = 0; i < 4; i++) {
      const monthIndex = (startMonthIndex + i * 3) % 12;
      dueMonths.push(monthIndex);
    }

    return dueMonths;
  }

  onTogglePaidStatus(expense: TableExpense): void {
    const isPaid = !expense.isPaid;
    expense.isLoading = true;
    this.expenseService
      .update(expense.id as string, {
        isPaid,
        lastPaymentDate: isPaid ? new Date() : null,
      })
      .subscribe(() => {
        const lastPaymentDate = isPaid ? new Date() : null;
        expense.isPaid = isPaid;
        expense.lastPaymentDate = lastPaymentDate;
        expense.isLoading = false;
      });
  }

  onEditExpense(expense: TableExpense): void {
    this.dialogService
      .showCustomComponent('Edit Expense', ExpenseFormComponent, { expense })
      .subscribe((result: Expense) => {
        const dataIdx = this.tblDataSource.data.findIndex(
          (d) => d.id === result.id
        );
        this.tblDataSource.data[dataIdx] = {
          ...expense,
          ...result,
        };
        this.tblDataSource.data = [...this.tblDataSource.data];
        this.computeTotalExpenses();
      });
  }
}

interface TableExpense extends Expense {
  isLoading?: boolean;
}
