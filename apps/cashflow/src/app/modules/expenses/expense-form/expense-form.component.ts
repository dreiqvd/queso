import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

import { Expense } from '../../../models';
import { ExpenseService } from '../../../services';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent implements OnInit {
  expense!: Expense;

  private readonly expenseService = inject(ExpenseService);

  readonly dialogOkDisabled$ = new BehaviorSubject(true);
  readonly dialogCloseHandler = (): Observable<Partial<Expense>> | void =>
    this.submit();

  expenseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.required),
    category: new FormControl('', Validators.required),
    // paymentDay: new FormControl(Validators.required),
    // paymentAccount: new FormControl(Validators.required),
    // billingCycle: new FormControl('monthly', Validators.required),
    // startDate: new FormControl(''),
    // endDate: new FormControl(''),
    // isRecurring: new FormControl(false),
  });

  ngOnInit(): void {
    this.expenseForm.valueChanges.subscribe(() => {
      this.dialogOkDisabled$.next(this.expenseForm.invalid);
    });

    if (this.expense) {
      const { name, amount, category } = this.expense;
      this.expenseForm.patchValue(
        {
          name,
          amount,
          category,
        },
        { emitEvent: false }
      );
    }
  }

  private submit(): Observable<Partial<Expense>> | void {
    if (this.expenseForm.invalid) {
      return;
    }

    return this.expenseService
      .update(this.expense.id as string, {
        ...(this.expenseForm.value as Partial<Expense>),
      })
      .pipe(
        switchMap((result) =>
          of({
            ...this.expense,
            ...result.data,
          })
        )
      );
  }
}
