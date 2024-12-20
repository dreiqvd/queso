import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, take } from 'rxjs';

import { QsOverlaySpinnerComponent } from '@queso/ui-kit/spinner';

import { NavbarComponent } from '../../components/navbar';
import { BankAccount, FundSource } from '../../core/models';
import { BankAccountService, FundSourceService } from '../../core/services';

import { DashboardBankAccountsComponent } from './dashboard-bank-accounts/dashboard-bank-accounts.component';
import { DashboardSourceOfFundsComponent } from './dashboard-fund-sources/dashboard-fund-sources.component';

interface DashboardFundSource extends FundSource {
  total: number;
}

interface DashboardBankAccount extends BankAccount {
  isEditMode: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CurrencyPipe,
    QsOverlaySpinnerComponent,
    NavbarComponent,
    DashboardBankAccountsComponent,
    DashboardSourceOfFundsComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly fundSourceService = inject(FundSourceService);
  private readonly bankAccountService = inject(BankAccountService);

  readonly isLoading = signal(false);
  readonly nextMonthSavings = signal(0);
  readonly fundSources = signal<DashboardFundSource[]>([]);
  readonly bankAccounts = signal<DashboardBankAccount[]>([]);

  constructor() {
    this.isLoading.set(true);
    combineLatest([
      this.fundSourceService.list(),
      this.bankAccountService.list().pipe(take(1)),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([fundSources, bankAccounts]) => {
        this.fundSources.set(
          fundSources
            .sort((a, b) => b.receivables.length - a.receivables.length)
            .map((source) => ({
              ...source,
              total: source.receivables.reduce((acc, r) => acc + r, 0),
            }))
        );

        this.bankAccounts.set(
          bankAccounts
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((bankAccount) => ({
              ...bankAccount,
              isEditMode: false,
            }))
        );

        this.calculateNextMonthSavings();

        this.isLoading.set(false);
      });
  }

  private calculateNextMonthSavings(): void {
    // const currentPeriod
  }
}
