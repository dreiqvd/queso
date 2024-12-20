import { BaseModel } from './base.model';

export interface Budget extends BaseModel {
  name: string;
  amount: number;
}
