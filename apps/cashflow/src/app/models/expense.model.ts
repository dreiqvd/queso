import { BaseModel } from './base.model';

export interface Expense extends BaseModel {
  name: string;
  amount: number;
  paymentAccount: string;
  category: ExpenseCategory;
  isRecurring: boolean;
  paymentDay: number;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  startDate?: string;
  endDate?: string;
  isPaid?: boolean;
  lastPaymentDate?: FirestoreResponseDate | Date | null;
  dueDate?: string; // Date string reference of the original due date for non-monthly expenses
}

export type FirestoreResponseDate = {
  seconds: number;
  nanoseconds: number;
};

export type ExpenseCategory =
  | 'Credit/Loan'
  | 'Utility'
  | 'Subscriptions'
  | 'Insurance';
