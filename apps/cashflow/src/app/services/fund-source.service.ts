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
}
