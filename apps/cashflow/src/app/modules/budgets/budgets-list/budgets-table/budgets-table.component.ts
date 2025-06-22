import { CurrencyPipe } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { QsIcon } from '@queso/ui-kit/icon';

import { Budget } from '../../../../core/models/budget.model';
import { BaseTableDirective } from '../../../../directives';

interface TableBudget extends Budget {
  isLoading?: boolean;
}

@Component({
  selector: 'app-budgets-table',
  imports: [
    CurrencyPipe,
    MatTableModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    QsIcon,
  ],
  templateUrl: './budgets-table.component.html',
  styles: `
    td {
      --mat-icon-button-state-layer-color: var(--color-gray-100);

      padding: 16px;
    }

    tr.loading {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        z-index: 100;
      }
    }
  `,
})
export class BudgetsTableComponent extends BaseTableDirective<TableBudget> {
  readonly budgets = input.required<Budget[]>();

  constructor() {
    super();
    this.tblColumns = ['name', 'amount', 'action'];

    effect(() => {
      const data = this.budgets().sort((a, b) => b.amount - a.amount);
      this.tblDataSource.data = data;
    });
  }

  onEditBudget(budget: TableBudget): void {
    console.log('Edit budget:', budget);
  }

  onDeleteBudget(budget: TableBudget): void {
    console.log('Delete budget:', budget);
  }
}
