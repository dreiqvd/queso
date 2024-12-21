import { Injectable } from '@angular/core';
// import {
//   addDoc,
//   collection,
//   CollectionReference,
// } from '@angular/fire/firestore';

import { QsFirestoreBaseService } from '@queso/common/services';

import { BILLING_CYCLES } from '../constants';
import { Bill } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BillService extends QsFirestoreBaseService<Bill> {
  constructor() {
    super('bills');
  }

  /** Get payable bills based on the current month. */
  public getBillsToPay(bills: Bill[], month: Date | null = null): Bill[] {
    const currentMonth = month ? month.getMonth() : new Date().getMonth();
    const data = bills
      .filter((d) => {
        if (d.billingCycle === BILLING_CYCLES.Yearly) {
          return new Date(d.dueDate as string).getMonth() === currentMonth;
        } else if (d.billingCycle === BILLING_CYCLES.Quarterly) {
          const dueMonths = this.getQuarterlyDueMonths(d.dueDate as string);
          return dueMonths.includes(currentMonth);
        } else {
          return true; // Regular monthly bills are always displayed
        }
      })
      .sort((a, b) => b.amount - a.amount);

    return data;
  }

  /** Compute the months a quarterly bill is paid. */
  public getQuarterlyDueMonths(dueDate: string): number[] {
    const dueMonths: number[] = [];
    const startMonthIndex = new Date(dueDate).getMonth();

    for (let i = 0; i < 4; i++) {
      const monthIndex = (startMonthIndex + i * 3) % 12;
      dueMonths.push(monthIndex);
    }

    return dueMonths;
  }

  /** Bulk insert to the firestore database. Should only be used for
   * repopulating the firestore database.
   * */
  // public bulkInsert(): void {
  //   const collection$ = collection(
  //     this.firestore,
  //     'bills'
  //   ) as CollectionReference<Bill>;

  //   this.list().subscribe((bills) => {
  //     bills.forEach((bill) => {
  //       addDoc(collection$, bill as Bill);
  //     });
  //   });
  // }
}
