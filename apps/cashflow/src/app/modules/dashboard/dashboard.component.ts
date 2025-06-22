import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, take } from 'rxjs';

import { QsOverlaySpinner } from '@queso/ui-kit/spinner';

import { NavbarComponent } from '../../components/navbar';
import { BankAccount, Bill, Budget, FundSource } from '../../core/models';
import {
  BankAccountService,
  BillService,
  BudgetService,
  FundSourceService,
} from '../../core/services';

import { DashboardBankAccountsComponent } from './dashboard-bank-accounts/dashboard-bank-accounts.component';
import { DashboardSourceOfFundsComponent } from './dashboard-fund-sources/dashboard-fund-sources.component';
import { DashboardProjectionsComponent } from './dashboard-projections/dashboard-projections.component';

export interface DashboardFundSource extends FundSource {
  total: number;
}

export interface DashboardBankAccount extends BankAccount {
  isEditMode: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    QsOverlaySpinner,
    NavbarComponent,
    DashboardBankAccountsComponent,
    DashboardSourceOfFundsComponent,
    DashboardProjectionsComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly fundSourceService = inject(FundSourceService);
  private readonly bankAccountService = inject(BankAccountService);
  private readonly budgetService = inject(BudgetService);
  private readonly billService = inject(BillService);

  readonly isLoading = signal(false);
  readonly nextMonthSavings = signal(0);
  readonly fundSources = signal<DashboardFundSource[]>([]);
  readonly bankAccounts = signal<DashboardBankAccount[]>([]);
  readonly budgets = signal<Budget[]>([]);
  readonly bills = signal<Bill[]>([]);
  readonly fundSourcesTotalAmount = signal(0);
  readonly bankAccountsTotalBalance = signal(0);

  constructor() {
    this.isLoading.set(true);
    combineLatest([
      this.fundSourceService.list(),
      this.bankAccountService.list().pipe(take(1)),
      this.budgetService.list().pipe(take(1)),
      this.billService.list().pipe(take(1)),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([fundSources, bankAccounts, budgets, bills]) => {
        this.fundSources.set(
          fundSources
            .sort((a, b) => b.receivables.length - a.receivables.length)
            .map((source) => ({
              ...source,
              total: source.receivables.reduce((acc, r) => acc + r, 0),
            }))
        );

        this.fundSourcesTotalAmount.set(
          this.fundSources().reduce((acc, source) => acc + source.total, 0)
        );

        this.bankAccounts.set(
          bankAccounts
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((bankAccount) => ({
              ...bankAccount,
              isEditMode: false,
            }))
        );

        this.budgets.set(budgets);
        this.bills.set(bills);

        this.computeBankAccountTotalBalance();

        this.isLoading.set(false);
      });
  }

  private computeBankAccountTotalBalance(): void {
    this.bankAccountsTotalBalance.set(
      this.bankAccounts().reduce(
        (acc, bankAccount) => acc + bankAccount.balance,
        0
      )
    );
  }

  onAccountUpdated(): void {
    this.computeBankAccountTotalBalance();
  }
}
