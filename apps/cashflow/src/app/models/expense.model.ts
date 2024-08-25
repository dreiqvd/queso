import { BaseModel } from './base.model';

export interface Expense extends BaseModel {
  name: string;
  amount: number;
  paymentAccount: string;
  category: ExpenseCategory;
  period: 1 | 2;
  isRecurring: boolean;
  paymentDay: number;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  startDate?: string;
  endDate?: string;
  isPaid?: boolean;
  lastPaymentDate?: Date;
  paymentMonth?: number; // for non-monthly recurring expenses
}

export type ExpenseCategory =
  | 'Credit/Loan'
  | 'Utility'
  | 'Subscriptions'
  | 'Insurance';
