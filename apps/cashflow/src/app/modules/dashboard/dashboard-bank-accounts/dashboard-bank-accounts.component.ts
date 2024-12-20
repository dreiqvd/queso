import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QsIconComponent } from '@queso/ui-kit/icon';

import { BankAccount } from '../../../models/bank-account.model';
import { BankAccountService } from '../../../services';

interface DashboardBankAccount extends BankAccount {
  isEditMode: boolean;
}

@Component({
  selector: 'app-dashboard-bank-accounts',
  imports: [
    FormsModule,
    CurrencyPipe,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
    QsIconComponent,
  ],
  templateUrl: './dashboard-bank-accounts.component.html',
})
export class DashboardBankAccountsComponent {
  bankAccounts = input.required<DashboardBankAccount[]>();

  private readonly bankAccountService = inject(BankAccountService);

  readonly isEditing = signal(false);

  totalBalance = 0;

  constructor() {
    effect(() => {
      this.computeTotalBalance();
    });
  }

  private computeTotalBalance(): void {
    this.totalBalance = this.bankAccounts().reduce(
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
        account.balance = value;
        account.isEditMode = false;
        this.computeTotalBalance();
        this.isEditing.set(false);
      });
  }
}
