import { Injectable } from '@angular/core';

import { QsFirestoreBaseService } from '@queso/common/services';

import { BankAccount } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService extends QsFirestoreBaseService<BankAccount> {
  constructor() {
    super('bankAccounts');
  }
}
