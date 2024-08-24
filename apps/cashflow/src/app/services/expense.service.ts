import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Expense } from '../../models';

import expensesData from './expenses.json';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  getExpenses(): Observable<Expense[]> {
    return of(expensesData as Expense[]);
  }
}
