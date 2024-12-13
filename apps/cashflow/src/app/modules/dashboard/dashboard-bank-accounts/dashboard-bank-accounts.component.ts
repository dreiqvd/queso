import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QsIconComponent } from '@queso/ui-kit/icon';

import { BankAccount } from '../../../models/bank-account.model';

@Component({
  selector: 'app-dashboard-bank-accounts',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    MatButtonModule,
    MatTooltipModule,
    QsIconComponent,
  ],
  templateUrl: './dashboard-bank-accounts.component.html',
})
export class DashboardBankAccountsComponent implements OnInit {
  readonly bankAccounts: DashboardBankAccount[] = [
    {
      name: 'BDO',
      balance: 888888,
      accountNumber: '1234567890',
      color: '#004EA8',
      isEditMode: false,
    },
    {
      name: 'BPI',
      balance: 888888,
      accountNumber: '1234567890',
      color: '#B11116',
      isEditMode: false,
    },
    {
      name: 'UnionBank',
      balance: 888888,
      accountNumber: '1234567890',
      color: '#F7931E',
      isEditMode: false,
    },
  ];

  totalBalance = 0;

  ngOnInit(): void {
    this.computeTotalBalance();
  }

  private computeTotalBalance(): void {
    this.totalBalance = this.bankAccounts.reduce(
      (acc, bankAccount) => acc + bankAccount.balance,
      0
    );
  }

  onEditBalance(account: DashboardBankAccount): void {
    this.computeTotalBalance();
    account.isEditMode = false;
  }
}

interface DashboardBankAccount extends BankAccount {
  isEditMode: boolean;
}
