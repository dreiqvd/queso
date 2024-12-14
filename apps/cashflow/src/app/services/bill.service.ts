import { Injectable } from '@angular/core';
// import {
//   addDoc,
//   collection,
//   CollectionReference,
// } from '@angular/fire/firestore';

import { QsFirestoreBaseService } from '@queso/common/services';

import { Bill } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BillService extends QsFirestoreBaseService<Bill> {
  constructor() {
    super('bills');
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
