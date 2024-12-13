import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-bank-accounts',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './dashboard-bank-accounts.component.html',
})
export class DashboardBankAccountsComponent implements OnInit {
  readonly bankAccounts = [
    {
      name: 'BDO',
      balance: 888888,
      accountNumber: '1234567890',
      color: '#004EA8',
    },
    {
      name: 'BPI',
      balance: 888888,
      accountNumber: '1234567890',
      color: '#B11116',
    },
    {
      name: 'UnionBank',
      balance: 888888,
      accountNumber: '1234567890',
      color: '#F7931E',
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
}
