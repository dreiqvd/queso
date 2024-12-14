import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, effect, inject, input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter, of, switchMap, tap } from 'rxjs';

import { QsOrdinalPipe } from '@queso/common/pipes';
import { QsDialogActionTypes, QsDialogService } from '@queso/ui-kit/dialog';
import { QsIconComponent } from '@queso/ui-kit/icon';

import { BILLING_CYCLES } from '../../../../app.constants';
import { Bill, FirestoreResponseDate } from '../../../../models';
import { BillService } from '../../../../services';
import { BillFormComponent } from '../../bill-form/bill-form.component';

@Component({
  selector: 'app-bills-table',
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
  templateUrl: './bills-table.component.html',
  styleUrl: './bills-table.component.scss',
})
export class BillsTableComponent {
  @ViewChild(MatSort) sort!: MatSort;

  private readonly billService = inject(BillService);
  private readonly dialogService = inject(QsDialogService);

  bills = input.required<TableBill[]>();

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
  tblDataSource = new MatTableDataSource<Bill>();
  paymentAccounts: Array<{
    total: number;
    name: string;
  }> = [];
  totalBills = 0;

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

      this.computeTotalBills();
    });
  }

  private computeTotalBills(): void {
    const data = this.tblDataSource.data;
    this.totalBills = data.reduce((acc, curr) => acc + curr.amount, 0);
  }

  private getTableSourceData(): Bill[] {
    let data = this.bills();

    // Filter out yearly bills that are not yet due
    const currentMonth = new Date().getMonth();
    data = data.filter((d) => {
      if (d.billingCycle === BILLING_CYCLES.Yearly) {
        return new Date(d.dueDate as string).getMonth() === currentMonth;
      } else if (d.billingCycle === BILLING_CYCLES.Quarterly) {
        const dueMonths = this.getQuarterlyDueMonths(d.dueDate as string);
        return dueMonths.includes(currentMonth);
      } else {
        return true; // Monthly bills are always displayed
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

  /** Compute the months a quarterly bill is paid */
  private getQuarterlyDueMonths(dueDate: string): number[] {
    const dueMonths: number[] = [];
    const startMonthIndex = new Date(dueDate).getMonth();

    for (let i = 0; i < 4; i++) {
      const monthIndex = (startMonthIndex + i * 3) % 12;
      dueMonths.push(monthIndex);
    }

    return dueMonths;
  }

  onTogglePaidStatus(bill: TableBill): void {
    const isPaid = !bill.isPaid;
    bill.isLoading = true;
    this.billService
      .update(bill.id as string, {
        isPaid,
        lastPaymentDate: isPaid ? new Date() : null,
      })
      .subscribe(() => {
        const lastPaymentDate = isPaid ? new Date() : null;
        bill.isPaid = isPaid;
        bill.lastPaymentDate = lastPaymentDate;
        bill.isLoading = false;
      });
  }

  onEditBill(bill: TableBill): void {
    this.dialogService
      .showCustomComponent('Edit Bill', BillFormComponent, { bill })
      .pipe(
        tap(() => (bill.isLoading = true)),
        switchMap((formValue: Bill) => {
          return this.billService.update(bill.id as string, {
            ...(formValue as Partial<Bill>),
          });
        }),
        switchMap((result) => of(result.data))
      )
      .subscribe((result: Partial<Bill>) => {
        const dataIdx = this.tblDataSource.data.findIndex(
          (d) => d.id === result.id
        );
        this.tblDataSource.data[dataIdx] = {
          ...bill,
          ...result,
        };
        this.tblDataSource.data = [...this.tblDataSource.data];
        this.computeTotalBills();
        bill.isLoading = false;
      });
  }

  onDeleteBill(bill: TableBill): void {
    this.dialogService
      .showConfirmation(
        'Delete Bill?',
        'Are you sure you want to delete this bill?'
      )
      .pipe(
        filter((result) => result.type === QsDialogActionTypes.OK),
        tap(() => (bill.isLoading = true)),
        switchMap(() => this.billService.delete(bill.id as string))
      )
      .subscribe((response) => {
        this.tblDataSource.data = this.tblDataSource.data.filter(
          (d) => d.id !== response.id
        );
        this.computeTotalBills();
      });
  }
}

interface TableBill extends Bill {
  isLoading?: boolean;
}
