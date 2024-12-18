import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { format } from 'date-fns';
import { filter, of, switchMap, tap } from 'rxjs';

import { getViewportHeight } from '@queso/common';
import { QsOrdinalPipe } from '@queso/common/pipes';
import { QsDialogActionTypes, QsDialogService } from '@queso/ui-kit/dialog';
import { QsIconComponent } from '@queso/ui-kit/icon';

import { Bill, FirestoreResponseDate } from '../../../../models';
import { BillService } from '../../../../services';
import { BillFormComponent } from '../../bill-form/bill-form.component';

interface TableBill extends Bill {
  isLoading?: boolean;
}

@Component({
  selector: 'app-bills-table',
  imports: [
    NgClass,
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    QsOrdinalPipe,
    QsIconComponent,
  ],
  templateUrl: './bills-table.component.html',
  styleUrl: './bills-table.component.scss',
})
export class BillsTableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tableWrapper') tableWrapper!: ElementRef<HTMLDivElement>;

  private readonly billService = inject(BillService);
  private readonly dialogService = inject(QsDialogService);
  private readonly renderer2 = inject(Renderer2);

  totalBills = signal(0);
  bills = input.required<TableBill[]>();

  readonly tblColumns = [
    'name',
    'amount',
    'dueDate',
    'paymentAccount',
    'billingCycle',
    'lastPaymentDate',
    'isPaid',
    'action',
  ];
  tblDataSource = new MatTableDataSource<Bill>();
  paymentAccounts: Array<{
    total: number;
    name: string;
  }> = [];

  constructor() {
    afterRenderEffect(() => {
      setTimeout(() => {
        const tableWrapper = this.tableWrapper.nativeElement;
        const yOffset = tableWrapper.getBoundingClientRect().top;
        const height = getViewportHeight() - yOffset - 32;
        this.renderer2.setStyle(tableWrapper, 'height', `${height}px`);
        console.log('height computed');
      });
    });

    effect(() => {
      this.tblDataSource.sort = this.sort;
      const data = this.getTableSourceData();
      this.tblDataSource.data = data;
      this.paymentAccounts = data.reduce(
        (acc, curr) => {
          const account = acc.find((a) => a.name === curr.paymentAccount);
          if (account) {
            account.total += curr.amount;
          } else {
            acc.push({
              name: curr.paymentAccount,
              total: curr.amount,
            });
          }

          return acc;
        },
        [] as Array<{ total: number; name: string }>
      );

      this.computeTotalBills();
    });
  }

  private computeTotalBills(): void {
    const data = this.tblDataSource.data;
    this.totalBills.set(data.reduce((acc, curr) => acc + curr.amount, 0));
  }

  private getTableSourceData(): Bill[] {
    return this.bills().map((d) => ({
      ...d,
      isLoading: false,
      lastPaymentDate: d.lastPaymentDate
        ? new Date((d.lastPaymentDate as FirestoreResponseDate).seconds * 1000)
        : undefined,
    }));
  }

  onTogglePaidStatus(bill: TableBill): void {
    const isPaid = !bill.isPaid;
    bill.isLoading = true;
    this.billService
      .update(bill.id as string, {
        isPaid,
        lastPaymentDate: isPaid ? new Date() : null,
      })
      .subscribe(() => {
        const lastPaymentDate = isPaid ? new Date() : null;
        bill.isPaid = isPaid;
        bill.lastPaymentDate = lastPaymentDate;
        bill.isLoading = false;
      });
  }

  onEditBill(bill: TableBill): void {
    this.dialogService
      .showCustomComponent('Edit Bill', BillFormComponent, { bill })
      .pipe(
        tap(() => (bill.isLoading = true)),
        switchMap((formValue: Bill) => {
          if (formValue.startDate) {
            formValue.startDate = format(formValue.startDate, 'yyyy-MM-dd');
          }

          if (formValue.endDate) {
            formValue.endDate = format(formValue.endDate, 'yyyy-MM-dd');
          }

          return this.billService.update(bill.id as string, {
            ...(formValue as Partial<Bill>),
          });
        }),
        switchMap((result) => of(result.data))
      )
      .subscribe((result: Partial<Bill>) => {
        const dataIdx = this.tblDataSource.data.findIndex(
          (d) => d.id === result.id
        );
        this.tblDataSource.data[dataIdx] = {
          ...bill,
          ...result,
        };
        this.tblDataSource.data = [...this.tblDataSource.data];
        this.computeTotalBills();
        bill.isLoading = false;
      });
  }

  onDeleteBill(bill: TableBill): void {
    this.dialogService
      .showConfirmation(
        'Delete Bill?',
        'Are you sure you want to delete this bill?'
      )
      .pipe(
        filter((result) => result.type === QsDialogActionTypes.OK),
        tap(() => (bill.isLoading = true)),
        switchMap(() => this.billService.delete(bill.id as string))
      )
      .subscribe((response) => {
        this.tblDataSource.data = this.tblDataSource.data.filter(
          (d) => d.id !== response.id
        );
        this.computeTotalBills();
      });
  }
}
