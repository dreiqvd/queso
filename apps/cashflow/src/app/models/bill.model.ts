import { BaseModel } from './base.model';

export interface Bill extends BaseModel {
  name: string;
  amount: number;
  paymentAccount: string;
  category: BillCategory;
  isRecurring: boolean;
  paymentDay: number;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  startDate?: string;
  endDate?: string;
  isPaid?: boolean;
  lastPaymentDate?: FirestoreResponseDate | Date | null;
  dueDate?: string; // Date string reference of the original due date for non-monthly bills
}

export type FirestoreResponseDate = {
  seconds: number;
  nanoseconds: number;
};

export type BillCategory =
  | 'Utility'
  | 'Subscriptions'
  | 'Insurance'
  | 'Credit/Loan'
  | 'Plan';
