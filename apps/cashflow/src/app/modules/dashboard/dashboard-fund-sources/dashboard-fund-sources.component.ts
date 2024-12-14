import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { QsOrdinalPipe } from '@queso/common/pipes';

import { FundSource } from '../../../models';
import { FundSourceService } from '../../../services';

@Component({
  selector: 'app-dashboard-fund-sources',
  imports: [CurrencyPipe, QsOrdinalPipe],
  templateUrl: './dashboard-fund-sources.component.html',
  styleUrl: './dashboard-fund-sources.component.scss',
})
export class DashboardSourceOfFundsComponent implements OnInit {
  private readonly fundSourceService = inject(FundSourceService);

  fundSources: DashboardFundSource[] = [];
  overallTotal = 0;

  ngOnInit(): void {
    this.fundSourceService.list().subscribe((data) => {
      this.fundSources = data
        .sort((a, b) => b.receivables.length - a.receivables.length)
        .map((source) => ({
          ...source,
          total: source.receivables.reduce((acc, r) => acc + r, 0),
        }));

      this.overallTotal = this.fundSources.reduce(
        (acc, source) => acc + source.total,
        0
      );
    });
  }
}

interface DashboardFundSource extends FundSource {
  total: number;
}
