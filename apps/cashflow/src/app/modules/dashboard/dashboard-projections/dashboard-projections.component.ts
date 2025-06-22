import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { addMonths, format } from 'date-fns';

import { QsIcon } from '@queso/ui-kit/icon';

import { Bill, Budget } from '../../../core/models';
import { BillService, FundSourceService } from '../../../core/services';
import { DashboardFundSource } from '../dashboard.component';

interface ProjectedMonthlySavings {
  amount: number;
  netGain: number;
  month: string;
}

const PROJECTIONS_COUNT = 6; // number of months to be projected

@Component({
  selector: 'app-dashboard-projections',
  imports: [CurrencyPipe, MatSlideToggleModule, MatTooltipModule, QsIcon],
  templateUrl: './dashboard-projections.component.html',
})
export class DashboardProjections {
  readonly fundSources = input.required<DashboardFundSource[]>();
  readonly budgets = input.required<Budget[]>();
  readonly bills = input.required<Bill[]>();
  readonly bankAccountsTotalBalance = input.required<number>();
  readonly fundSourcesTotalAmount = input.required<number>();

  private readonly billService = inject(BillService);
  private readonly fundSourceService = inject(FundSourceService);

  projectedSavings: ProjectedMonthlySavings[] = [];

  constructor() {
    effect(() => {
      this.computeProjections();
    });
  }

  private computeProjections(): void {
    const projectedSavings = [];
    const currentDate = new Date();
    const totalBudget = this.budgets().reduce(
      (acc, budget) => acc + budget.amount,
      0
    );

    // Total Budget is subtracted because of the assumption that it is not yet spent
    let currentSavings = this.bankAccountsTotalBalance() - totalBudget;
    for (let i = 1; i <= PROJECTIONS_COUNT; i++) {
      const dateRef = addMonths(currentDate, i);
      dateRef.setDate(1);
      const month = format(dateRef, 'MMMM yyyy');

      const billsToPay = this.billService.filterBillsToPay(
        this.bills(),
        dateRef
      );
      const billsToPayAmount = billsToPay.reduce(
        (acc, bill) => acc + bill.amount,
        0
      );
      const monthlyNet =
        this.fundSourcesTotalAmount() - billsToPayAmount - totalBudget;

      currentSavings += monthlyNet;

      projectedSavings.push({
        amount: currentSavings,
        netGain: monthlyNet,
        month,
      });
    }

    this.projectedSavings = [...projectedSavings];
  }

  onTogglePeriod2Income(event: MatSlideToggleChange): void {
    const [, p2Total] = this.fundSourceService.getTotalsByPeriod(
      this.fundSources()
    );

    if (event.checked) {
      this.projectedSavings.forEach((s) => (s.amount += p2Total));
    } else {
      this.projectedSavings.forEach((s) => (s.amount -= p2Total));
    }
  }
}
