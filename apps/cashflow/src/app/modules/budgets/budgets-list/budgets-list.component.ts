import { CurrencyPipe } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';

import { Budget } from '../../../core/models/budget.model';
import { BudgetService } from '../../../core/services';

import { BudgetsTableComponent } from './budgets-table/budgets-table.component';

@Component({
  selector: 'app-budgets-list',
  imports: [CurrencyPipe, BudgetsTableComponent],
  templateUrl: './budgets-list.component.html',
})
export class BudgetsListComponent {
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
