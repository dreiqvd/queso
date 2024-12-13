import { BaseModel } from './base.model';

export interface BankAccount extends BaseModel {
  name: string;
  balance: number;
  accountNumber: string;
  color: string;
}
