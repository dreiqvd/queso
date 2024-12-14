import { BaseModel } from './base.model';

export interface FundSource extends BaseModel {
  name: string;
  receivables: number[];
  color: string;
}
