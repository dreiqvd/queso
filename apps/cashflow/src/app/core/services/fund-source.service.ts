import { Injectable } from '@angular/core';

import { QsFirestoreBaseService } from '@queso/common/services';

import { FundSource } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FundSourceService extends QsFirestoreBaseService<FundSource> {
  constructor() {
    super('fundSources');
  }

  /** Compute totals by period */
  getTotalsByPeriod(fundSources: FundSource[]): [number, number] {
    const totals = fundSources.reduce(
      (totals, source) => {
        totals[0] += source.receivables[0];
        totals[1] += source.receivables[1] || 0;

        return totals;
      },
      [0, 0]
    ) as [number, number];

    return totals;
  }
}
