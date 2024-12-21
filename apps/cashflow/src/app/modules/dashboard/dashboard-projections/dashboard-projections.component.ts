import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { addMonths } from 'date-fns';

import { QsIconComponent } from '@queso/ui-kit/icon';

import { Bill, Budget } from '../../../core/models';
import { BillService, FundSourceService } from '../../../core/services';
import { DashboardFundSource } from '../dashboard.component';

@Component({
  selector: 'app-dashboard-projections',
  imports: [
    CurrencyPipe,
    MatSlideToggleModule,
    MatTooltipModule,
    QsIconComponent,
  ],
  templateUrl: './dashboard-projections.component.html',
})
export class DashboardProjectionsComponent {
  readonly fundSources = input.required<DashboardFundSource[]>();
  readonly budgets = input.required<Budget[]>();
  readonly bills = input.required<Bill[]>();
  readonly bankAccountsTotalBalance = input.required<number>();
  readonly fundSourcesTotalAmount = input.required<number>();

  private readonly billService = inject(BillService);
  private readonly fundSourceService = inject(FundSourceService);

  readonly monthlyNet = signal(0);
  readonly nextMonthSavings = signal(0);

  /** Savings without fund source income */
  private originalNextMonthSavings = 0;

  constructor() {
    effect(() => {
      this.calculateNumbers();
    });
  }

  private calculateNumbers(): void {
    const totalSavings =
      this.bankAccountsTotalBalance() + this.fundSourcesTotalAmount();

    const totalBudget = this.budgets().reduce(
      (acc, budget) => acc + budget.amount,
      0
    );

    const nextMonth = addMonths(new Date(), 1);
    nextMonth.setDate(1);

    const billsToPay = this.billService.filterBillsToPay(
      this.bills(),
      nextMonth
    );
    const billsToPayAmount = billsToPay.reduce(
      (acc, bill) => acc + bill.amount,
      0
    );

    // Compute monthly net
    const monthlyNet =
      this.fundSourcesTotalAmount() - billsToPayAmount - totalBudget;
    this.monthlyNet.set(monthlyNet);

    // Allocated monthly budget is subtracted twice - one for current month and one for next month
    const nextMonthSavings = totalSavings - billsToPayAmount - totalBudget * 2;
    this.originalNextMonthSavings = nextMonthSavings;
    this.nextMonthSavings.set(nextMonthSavings);
  }

  onTogglePeriod2Income(event: MatSlideToggleChange): void {
    const [, p2Total] = this.fundSourceService.getTotalsByPeriod(
      this.fundSources()
    );

    let nextMonthSavings = this.originalNextMonthSavings;
    if (event.checked) {
      nextMonthSavings += p2Total;
    }

    this.nextMonthSavings.set(nextMonthSavings);
  }
}
