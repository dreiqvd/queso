import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Expense } from '../../../models';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent implements OnInit {
  expense!: Expense;

  ngOnInit(): void {
    console.log(this.expense);
  }
}
