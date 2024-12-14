import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { format } from 'date-fns';
import { BehaviorSubject, Observable, of, switchMap, take } from 'rxjs';

import { BILLING_CATEGORIES, BILLING_CYCLES } from '../../../app.constants';
import { Expense } from '../../../models';
import { ExpenseService, PaymentAccountService } from '../../../services';

@Component({
  selector: 'app-expense-form',
  imports: [
    AsyncPipe,
    TitleCasePipe,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent implements OnInit {
  expense!: Expense;

  private readonly expenseService = inject(ExpenseService);
  private readonly paymentAccountService = inject(PaymentAccountService);

  readonly dialogOkDisabled$ = new BehaviorSubject(true);
  readonly dialogCloseHandler = (): Observable<Partial<Expense>> | void =>
    this.submit();
  readonly paymentAccounts$ = this.paymentAccountService.list().pipe(take(1));
  readonly billingCycles = Object.values(BILLING_CYCLES);
  readonly billingCategories = BILLING_CATEGORIES;

  expenseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.required),
    category: new FormControl('', Validators.required),
    billingCycle: new FormControl('monthly', Validators.required),
    paymentDay: new FormControl(1, Validators.required),
    paymentAccount: new FormControl('', Validators.required),
    isRecurring: new FormControl(true),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
  });

  ngOnInit(): void {
    this.expenseForm.valueChanges.subscribe(() => {
      this.dialogOkDisabled$.next(this.expenseForm.invalid);
    });

    if (this.expense) {
      const {
        name,
        amount,
        category,
        billingCycle,
        paymentDay,
        paymentAccount,
        isRecurring,
      } = this.expense;

      const startDate = this.expense.startDate
        ? new Date(this.expense.startDate)
        : null;
      const endDate = this.expense.endDate
        ? new Date(this.expense.endDate)
        : null;

      this.expenseForm.patchValue(
        {
          name,
          amount,
          category,
          billingCycle,
          paymentDay,
          paymentAccount,
          isRecurring,
          startDate,
          endDate,
        },
        { emitEvent: false }
      );
    }
  }

  private submit(): Observable<Partial<Expense>> | void {
    if (this.expenseForm.invalid) {
      return;
    }

    if (this.expense) {
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
    } else {
      const payload = this.expenseForm.value as Partial<Expense>;
      if (payload.startDate) {
        payload.startDate = format(payload.startDate, 'yyyy-MM-dd');
      }

      if (payload.endDate) {
        payload.endDate = format(payload.endDate, 'yyyy-MM-dd');
      }

      return this.expenseService
        .create(payload)
        .pipe(switchMap((result) => of(result.data)));
    }
  }
}
