import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { format } from 'date-fns';
import { switchMap, tap } from 'rxjs';

import { QsDialogService } from '@queso/ui-kit/dialog';
import { QsIcon } from '@queso/ui-kit/icon';
import { QsOverlaySpinner } from '@queso/ui-kit/spinner';
import { QsTabGroup } from '@queso/ui-kit/tabs';

import { Bill } from '../../../core/models';
import { BillService } from '../../../core/services';
import { getPeriod } from '../../../core/utils';
import { BillForm } from '../bill-form/bill-form.component';

import { BillsTable } from './bills-table/bills-table.component';

@Component({
  selector: 'app-bills-list',
  imports: [
    CurrencyPipe,
    NgTemplateOutlet,
    MatTabsModule,
    MatButtonModule,
    QsTabGroup,
    QsIcon,
    QsOverlaySpinner,
    BillsTable,
  ],
  templateUrl: './bills-list.component.html',
  styles: `
    .table-heading {
      --mdc-filled-button-container-height: 36px;
      --mdc-filled-button-label-text-color: white;

      width: calc(100% - 328px);
    }
  `,
})
export class BillsList {
  private readonly billService = inject(BillService);
  private readonly dialogService = inject(QsDialogService);

  readonly isLoading = signal(false);
  readonly loadedTabIndexes = signal<number[]>([0]);
  readonly selectedPeriodIndex = signal<number>(
    new Date().getDate() > 15 ? 0 : 1
  );
  billsToPayAmount = signal(0);

  period1Bills: Bill[] = [];
  period2Bills: Bill[] = [];
  allBills: Bill[] = [];

  constructor() {
    afterNextRender(() => {
      this.billService.list().subscribe((bills) => {
        const billsToPay = this.billService.filterBillsToPay(bills);
        // Bills that are paid before the 30th of the month (excluding 30th bills).
        // Note: 31st bills should be paid before 30th of the month and thus included for period 1
        this.period1Bills = billsToPay.filter(
          (d) => getPeriod(d.paymentDay) === 1
        );
        // Bills that are paid before the 15th of the month (excluding 15th bills).
        this.period2Bills = billsToPay.filter(
          (d) => getPeriod(d.paymentDay) === 2
        );

        this.billsToPayAmount.set(
          billsToPay.reduce((acc, bill) => acc + bill.amount, 0)
        );

        this.allBills = bills.sort((a, b) => a.paymentDay - b.paymentDay);
      });
    });
  }

  markAllAsUnpaid(): void {
    const bills =
      this.selectedPeriodIndex() === 0 ? this.period1Bills : this.period2Bills;

    this.isLoading.set(true);
    this.billService
      .bulkUpdate(
        bills.map((d) => d.id as string),
        { isPaid: false }
      )
      .subscribe(() => {
        bills.forEach((d) => (d.isPaid = false));
        if (this.selectedPeriodIndex() === 0) {
          this.period1Bills = [...bills];
        } else {
          this.period2Bills = [...bills];
        }
        this.isLoading.set(false);
      });
  }

  onAddBill(): void {
    this.dialogService
      .showCustomComponent('Add Bill', BillForm, {})
      .pipe(
        tap(() => this.isLoading.set(true)),
        switchMap((bill: Partial<Bill>) => {
          const payload = bill;
          if (payload.startDate) {
            payload.startDate = format(payload.startDate, 'yyyy-MM-dd');
          }

          if (payload.endDate) {
            payload.endDate = format(payload.endDate, 'yyyy-MM-dd');
          }

          return this.billService.create(payload);
        })
      )
      .subscribe(() => {
        this.isLoading.set(false);
      });
  }
}
