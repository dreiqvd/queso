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
  fundSourcesTotalAmount = input.required<number>();

  period1Total = 0;
  period2Total = 0;

  constructor() {
    effect(() => {
      const { period1Total, period2Total } = this.fundSources().reduce(
        (totals, source) => {
          totals.period1Total += source.receivables[0];
          totals.period2Total += source.receivables[1] || 0;

          return totals;
        },
        { period1Total: 0, period2Total: 0 }
      );

      this.period1Total = period1Total;
      this.period2Total = period2Total;
    });
  }
}
