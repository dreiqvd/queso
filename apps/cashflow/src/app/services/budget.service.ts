import { Injectable } from '@angular/core';

import { QsFirestoreBaseService } from '@queso/common/services';

import { Budget } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BudgetService extends QsFirestoreBaseService<Budget> {
  constructor() {
    super('budgets');
  }
}
