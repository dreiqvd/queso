import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';

import { QsOrdinalSuffix } from '@queso/common/pipes';

import { FundSource } from '../../../core/models';
import { FundSourceService } from '../../../core/services';

interface DashboardFundSource extends FundSource {
  total: number;
}

@Component({
  selector: 'app-dashboard-fund-sources',
  imports: [CurrencyPipe, QsOrdinalSuffix],
  templateUrl: './dashboard-fund-sources.component.html',
})
export class DashboardSourceOfFunds {
  fundSources = input.required<DashboardFundSource[]>();
  fundSourcesTotalAmount = input.required<number>();

  private readonly fundSourceService = inject(FundSourceService);

  period1Total = 0;
  period2Total = 0;

  constructor() {
    effect(() => {
      const [p1Total, p2Total] = this.fundSourceService.getTotalsByPeriod(
        this.fundSources()
      );

      this.period1Total = p1Total;
      this.period2Total = p2Total;
    });
  }
}
