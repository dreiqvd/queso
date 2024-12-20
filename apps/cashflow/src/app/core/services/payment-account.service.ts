import { Injectable } from '@angular/core';

import { QsFirestoreBaseService } from '@queso/common/services';

import { PaymentAccount } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PaymentAccountService extends QsFirestoreBaseService<PaymentAccount> {
  constructor() {
    super('paymentAccounts');
  }
}
