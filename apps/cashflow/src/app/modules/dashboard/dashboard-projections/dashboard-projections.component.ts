import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { addMonths } from 'date-fns';

import { Bill, Budget } from '../../../core/models';
import { BillService } from '../../../core/services';
import { DashboardFundSource } from '../dashboard.component';

@Component({
  selector: 'app-dashboard-projections',
  imports: [CurrencyPipe, MatSlideToggleModule],
  templateUrl: './dashboard-projections.component.html',
})
export class DashboardProjectionsComponent {
  readonly fundSources = input.required<DashboardFundSource[]>();
  readonly budgets = input.required<Budget[]>();
  readonly bills = input.required<Bill[]>();
  readonly bankAccountsTotalBalance = input.required<number>();
  readonly fundSourcesTotalAmount = input.required<number>();

  private readonly billService = inject(BillService);

  readonly nextMonthSavings = signal(0);
  readonly enablePeriod1Income = signal(false);
  readonly enablePeriod2Income = signal(false);

  constructor() {
    effect(() => {
      this.calculateNextMonthSavings();
    });
  }

  private calculateNextMonthSavings(): void {
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

    const nextMonthSavings = totalSavings - billsToPayAmount - totalBudget;
    this.nextMonthSavings.set(nextMonthSavings);
  }
}
