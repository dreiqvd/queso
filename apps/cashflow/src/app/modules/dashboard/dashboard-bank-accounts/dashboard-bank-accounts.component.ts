import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QsIconComponent } from '@queso/ui-kit/icon';
import { QsOverlaySpinnerComponent } from '@queso/ui-kit/spinner';

import { BankAccount } from '../../../models/bank-account.model';
import { BankAccountService } from '../../../services';

@Component({
  selector: 'app-dashboard-bank-accounts',
  imports: [
    FormsModule,
    CurrencyPipe,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
    QsIconComponent,
    QsOverlaySpinnerComponent,
  ],
  templateUrl: './dashboard-bank-accounts.component.html',
})
export class DashboardBankAccountsComponent implements OnInit {
  private readonly bankAccountService = inject(BankAccountService);

  readonly isLoading = signal(true);
  readonly isEditing = signal(false);

  bankAccounts: DashboardBankAccount[] = [];
  totalBalance = 0;

  ngOnInit(): void {
    this.bankAccountService.list().subscribe((data) => {
      this.bankAccounts = data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((bankAccount) => ({
          ...bankAccount,
          isEditMode: false,
        }));
      this.computeTotalBalance();
      this.isLoading.set(false);
    });
  }

  private computeTotalBalance(): void {
    this.totalBalance = this.bankAccounts.reduce(
      (acc, bankAccount) => acc + bankAccount.balance,
      0
    );
  }

  onEditBalance(account: DashboardBankAccount, amount: string): void {
    const value = parseFloat(amount);
    if (account.balance === value) {
      account.isEditMode = false;
      return;
    }

    this.isEditing.set(true);
    this.bankAccountService
      .update(account.id as string, {
        balance: value,
      })
      .subscribe(() => {
        this.computeTotalBalance();
        account.balance = value;
        account.isEditMode = false;
        this.isEditing.set(false);
      });
  }
}

interface DashboardBankAccount extends BankAccount {
  isEditMode: boolean;
}
