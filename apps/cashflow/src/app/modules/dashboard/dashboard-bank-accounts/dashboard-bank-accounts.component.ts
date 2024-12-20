import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QsIconComponent } from '@queso/ui-kit/icon';

import { BankAccount } from '../../../core/models/bank-account.model';
import { BankAccountService } from '../../../core/services';

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
  bankAccountsTotalBalance = input.required<number>();
  accountUpdated = output<void>();

  private readonly bankAccountService = inject(BankAccountService);

  readonly isEditing = signal(false);

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
        this.isEditing.set(false);
        this.accountUpdated.emit();
      });
  }
}
