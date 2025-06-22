import { CurrencyPipe } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';

import { Budget } from '../../../core/models/budget.model';
import { BudgetService } from '../../../core/services';

import { BudgetsTable } from './budgets-table/budgets-table.component';

@Component({
  selector: 'app-budgets-list',
  imports: [CurrencyPipe, BudgetsTable],
  templateUrl: './budgets-list.component.html',
})
export class BudgetsList {
  private readonly budgetService = inject(BudgetService);

  monthlyTotal = 0;
  budgets: Budget[] = [];

  constructor() {
    afterNextRender(() => {
      this.budgetService.list().subscribe((budgets) => {
        this.budgets = budgets;
        this.calculateMonthlyTotal();
      });
    });
  }

  private calculateMonthlyTotal(): void {
    this.monthlyTotal = this.budgets.reduce(
      (acc, budget) => acc + budget.amount,
      0
    );
  }
}
