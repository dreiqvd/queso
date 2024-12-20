import { CurrencyPipe } from '@angular/common';
import { Component, effect, input } from '@angular/core';

import { QsOrdinalPipe } from '@queso/common/pipes';

import { FundSource } from '../../../core/models';

interface DashboardFundSource extends FundSource {
  total: number;
}

@Component({
  selector: 'app-dashboard-fund-sources',
  imports: [CurrencyPipe, QsOrdinalPipe],
  templateUrl: './dashboard-fund-sources.component.html',
})
export class DashboardSourceOfFundsComponent {
  fundSources = input.required<DashboardFundSource[]>();

  overallTotal = 0;
  period1Total = 0;
  period2Total = 0;

  constructor() {
    effect(() => {
      this.fundSources().forEach((source) => {
        this.overallTotal += source.total;
        this.period1Total += source.receivables[0];
        this.period2Total += source.receivables[1] || 0;
      });
    });
  }
}
