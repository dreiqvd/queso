import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { format } from 'date-fns';
import { filter, of, switchMap, tap } from 'rxjs';

import { QsOrdinalPipe } from '@queso/common/pipes';
import { QsDialogActionTypes, QsDialogService } from '@queso/ui-kit/dialog';
import { QsIcon } from '@queso/ui-kit/icon';

import { Bill, FirestoreResponseDate } from '../../../../core/models';
import { BillService } from '../../../../core/services';
import { BaseTableDirective } from '../../../../directives';
import { BillFormComponent } from '../../bill-form/bill-form.component';

interface TableBill extends Bill {
  isLoading?: boolean;
}

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
    QsIcon,
  ],
  templateUrl: './bills-table.component.html',
  styles: `
    td {
      --mat-icon-button-state-layer-color: var(--color-gray-100);

      padding: 16px;
    }

    tr.loading {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        z-index: 100;
      }
    }
  `,
})
export class BillsTableComponent extends BaseTableDirective<TableBill> {
  /** Whether to hide the Mark All as Unpaid action button */
  readonly bills = input.required<TableBill[]>();

  private readonly billService = inject(BillService);
  private readonly dialogService = inject(QsDialogService);

  totalBills = signal(0);
  paymentAccounts: Array<{
    total: number;
    name: string;
  }> = [];

  constructor() {
    super();
    this.tblColumns = [
      'name',
      'amount',
      'dueDate',
      'paymentAccount',
      'billingCycle',
      'lastPaymentDate',
      'isPaid',
      'action',
    ];

    effect(() => {
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
    this.totalBills.set(data.reduce((acc, curr) => acc + curr.amount, 0));
  }

  private getTableSourceData(): Bill[] {
    return this.bills().map((d) => ({
      ...d,
      isLoading: false,
      lastPaymentDate: d.lastPaymentDate
        ? new Date((d.lastPaymentDate as FirestoreResponseDate).seconds * 1000)
        : undefined,
    }));
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
          if (formValue.startDate) {
            formValue.startDate = format(formValue.startDate, 'yyyy-MM-dd');
          }

          if (formValue.endDate) {
            formValue.endDate = format(formValue.endDate, 'yyyy-MM-dd');
          }

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
