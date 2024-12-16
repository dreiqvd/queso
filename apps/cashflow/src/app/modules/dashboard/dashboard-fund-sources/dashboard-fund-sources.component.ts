import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { QsOrdinalPipe } from '@queso/common/pipes';
import { QsOverlaySpinnerComponent } from '@queso/ui-kit/spinner';

import { FundSource } from '../../../models';
import { FundSourceService } from '../../../services';

interface DashboardFundSource extends FundSource {
  total: number;
}

@Component({
  selector: 'app-dashboard-fund-sources',
  imports: [CurrencyPipe, QsOrdinalPipe, QsOverlaySpinnerComponent],
  templateUrl: './dashboard-fund-sources.component.html',
})
export class DashboardSourceOfFundsComponent implements OnInit {
  private readonly fundSourceService = inject(FundSourceService);

  isLoading = signal(true);

  fundSources: DashboardFundSource[] = [];
  overallTotal = 0;
  period1Total = 0;
  period2Total = 0;

  ngOnInit(): void {
    this.fundSourceService.list().subscribe((data) => {
      this.fundSources = data
        .sort((a, b) => b.receivables.length - a.receivables.length)
        .map((source) => ({
          ...source,
          total: source.receivables.reduce((acc, r) => acc + r, 0),
        }));

      this.fundSources.forEach((source) => {
        this.overallTotal += source.total;
        this.period1Total += source.receivables[0];
        this.period2Total += source.receivables[1] || 0;
      });

      this.isLoading.set(false);
    });
  }
}
