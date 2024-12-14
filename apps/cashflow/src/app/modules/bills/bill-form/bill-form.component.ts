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
import { Bill } from '../../../models';
import { BillService, PaymentAccountService } from '../../../services';

@Component({
  selector: 'app-bill-form',
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
  templateUrl: './bill-form.component.html',
})
export class BillFormComponent implements OnInit {
  bill!: Bill;

  private readonly billService = inject(BillService);
  private readonly paymentAccountService = inject(PaymentAccountService);

  readonly dialogOkDisabled$ = new BehaviorSubject(true);
  readonly dialogCloseHandler = (): Observable<Partial<Bill>> | void =>
    this.submit();
  readonly paymentAccounts$ = this.paymentAccountService.list().pipe(take(1));
  readonly billingCycles = Object.values(BILLING_CYCLES);
  readonly billingCategories = BILLING_CATEGORIES;

  billForm = new FormGroup({
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
    this.billForm.valueChanges.subscribe(() => {
      this.dialogOkDisabled$.next(this.billForm.invalid);
    });

    if (this.bill) {
      const {
        name,
        amount,
        category,
        billingCycle,
        paymentDay,
        paymentAccount,
        isRecurring,
      } = this.bill;

      const startDate = this.bill.startDate
        ? new Date(this.bill.startDate)
        : null;
      const endDate = this.bill.endDate ? new Date(this.bill.endDate) : null;

      this.billForm.patchValue(
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

  private submit(): Observable<Partial<Bill>> | void {
    if (this.billForm.invalid) {
      return;
    }

    if (this.bill) {
      return this.billService
        .update(this.bill.id as string, {
          ...(this.billForm.value as Partial<Bill>),
        })
        .pipe(
          switchMap((result) =>
            of({
              ...this.bill,
              ...result.data,
            })
          )
        );
    } else {
      const payload = this.billForm.value as Partial<Bill>;
      if (payload.startDate) {
        payload.startDate = format(payload.startDate, 'yyyy-MM-dd');
      }

      if (payload.endDate) {
        payload.endDate = format(payload.endDate, 'yyyy-MM-dd');
      }

      return this.billService
        .create(payload)
        .pipe(switchMap((result) => of(result.data)));
    }
  }
}
