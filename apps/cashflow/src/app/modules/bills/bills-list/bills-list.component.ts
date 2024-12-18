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

import { BILLING_CYCLES } from '../../../app.constants';
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
  readonly loadedTabIndexes = signal<number[]>([0]);
  readonly selectedPeriodIndex = signal<number>(
    new Date().getDate() > 15 ? 0 : 1
  );

  period1Bills: Bill[] = [];
  period2Bills: Bill[] = [];
  allBills: Bill[] = [];
  monthlyTotal = 0;

  constructor() {
    afterNextRender(() => {
      this.billService.list().subscribe((bills) => {
        const periodicalBills = this.getPeriodicalBills(bills);
        // Bills that are paid before the 30th of the month (excluding 30th bills).
        // Note: 31st bills should be paid before 30th of the month and thus included for period 1
        this.period1Bills = periodicalBills.filter(
          (d) =>
            (d.paymentDay >= 1 && d.paymentDay <= 15) || d.paymentDay === 31
        );
        // Bills that are paid before the 15th of the month (excluding 15th bills).
        this.period2Bills = periodicalBills.filter(
          (d) => d.paymentDay >= 16 && d.paymentDay <= 30
        );

        this.allBills = bills.sort((a, b) => a.paymentDay - b.paymentDay);
        this.monthlyTotal = [...this.period1Bills, ...this.period2Bills].reduce(
          (acc, bill) => acc + bill.amount,
          0
        );
      });
    });
  }

  private getPeriodicalBills(bills: Bill[]): Bill[] {
    // Filter out yearly bills that are not yet due
    const currentMonth = new Date().getMonth();
    const data = bills
      .filter((d) => {
        if (d.billingCycle === BILLING_CYCLES.Yearly) {
          return new Date(d.dueDate as string).getMonth() === currentMonth;
        } else if (d.billingCycle === BILLING_CYCLES.Quarterly) {
          const dueMonths = this.getQuarterlyDueMonths(d.dueDate as string);
          return dueMonths.includes(currentMonth);
        } else {
          return true; // Monthly bills are always displayed
        }
      })
      .sort((a, b) => b.amount - a.amount);

    return data;
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
