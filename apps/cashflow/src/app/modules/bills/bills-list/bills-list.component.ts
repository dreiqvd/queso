import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { format } from 'date-fns';
import { switchMap, tap } from 'rxjs';

import { QsDialogService } from '@queso/ui-kit/dialog';
import { QsIconComponent } from '@queso/ui-kit/icon';
import { QsOverlaySpinnerComponent } from '@queso/ui-kit/spinner';
import { QsTabGroupDirective } from '@queso/ui-kit/tabs';

import { Bill } from '../../../models';
import { BillService } from '../../../services';
import { BillFormComponent } from '../bill-form/bill-form.component';

import { BillsTableComponent } from './bills-table/bills-table.component';

@Component({
  selector: 'app-bills-list',
  imports: [
    CurrencyPipe,
    NgTemplateOutlet,
    MatTabsModule,
    MatButtonModule,
    QsTabGroupDirective,
    QsIconComponent,
    QsOverlaySpinnerComponent,
    BillsTableComponent,
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
export class BillsListComponent {
  private readonly billService = inject(BillService);
  private readonly dialogService = inject(QsDialogService);

  readonly isLoading = signal(false);

  readonly selectedPeriodIndex = new Date().getDate() > 15 ? 0 : 1;
  period1Bills: Bill[] = [];
  period2Bills: Bill[] = [];
  overallTotal = 0;

  bills: Bill[] = [];

  constructor() {
    afterNextRender(() => {
      this.billService.list().subscribe((bills) => {
        // Bills that are paid on the 30th of the month (excluding 30th bills).
        // Note: 31st bills should be paid on 30th of the month and thus included for period 2
        this.period1Bills = bills.filter(
          (d) =>
            (d.paymentDay >= 1 && d.paymentDay <= 15) || d.paymentDay === 31
        );
        // Bills that are paid on the 15th of the month (excluding 15th bills).
        this.period2Bills = bills.filter(
          (d) => d.paymentDay >= 16 && d.paymentDay <= 30
        );

        this.overallTotal = bills.reduce((acc, bill) => acc + bill.amount, 0);
      });
    });
  }

  markAllAsUnpaid(): void {
    const bills =
      this.selectedPeriodIndex === 0 ? this.period1Bills : this.period2Bills;

    this.billService
      .bulkUpdate(
        bills.map((d) => d.id as string),
        { isPaid: false }
      )
      .subscribe(() => {
        bills.forEach((d) => (d.isPaid = false));
        if (this.selectedPeriodIndex === 0) {
          this.period1Bills = [...bills];
        } else {
          this.period2Bills = [...bills];
        }
      });
  }

  onAddBill(): void {
    this.dialogService
      .showCustomComponent('Add Bill', BillFormComponent, {})
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