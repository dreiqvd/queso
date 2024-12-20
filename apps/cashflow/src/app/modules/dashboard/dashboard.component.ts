import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, take } from 'rxjs';

import { QsOverlaySpinnerComponent } from '@queso/ui-kit/spinner';

import { NavbarComponent } from '../../components/navbar';
import { BankAccount, FundSource } from '../../models';
import { BankAccountService, FundSourceService } from '../../services';

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
    NavbarComponent,
    QsOverlaySpinnerComponent,
    DashboardBankAccountsComponent,
    DashboardSourceOfFundsComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly fundSourceService = inject(FundSourceService);
  private readonly bankAccountService = inject(BankAccountService);

  readonly isLoading = signal(false);

  fundSources: DashboardFundSource[] = [];
  bankAccounts: DashboardBankAccount[] = [];

  constructor() {
    this.isLoading.set(true);
    combineLatest([
      this.fundSourceService.list(),
      this.bankAccountService.list().pipe(take(1)),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([fundSources, bankAccounts]) => {
        this.fundSources = fundSources
          .sort((a, b) => b.receivables.length - a.receivables.length)
          .map((source) => ({
            ...source,
            total: source.receivables.reduce((acc, r) => acc + r, 0),
          }));

        this.bankAccounts = bankAccounts
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((bankAccount) => ({
            ...bankAccount,
            isEditMode: false,
          }));

        this.isLoading.set(false);
      });
  }
}
