import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
} from '@angular/fire/firestore';

import { QsFirestoreBaseService } from '@queso/common/services';

import { Expense } from '../models';

// import EXPENSES_DATA from './expenses.json';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService extends QsFirestoreBaseService<Expense> {
  constructor() {
    super('expenses');
  }

  /** Bulk insert to the firestore database. Should only be used for
   * repopulating the firestore database.
   * */
  public bulkInsert(): void {
    const collection$ = collection(
      this.firestore,
      'expenses'
    ) as CollectionReference<Expense>;
    const EXPENSES_DATA = [] as Expense[];
    EXPENSES_DATA.forEach((expense) => {
      addDoc(collection$, expense as Expense);
    });
  }
}
