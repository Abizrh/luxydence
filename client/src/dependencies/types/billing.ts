export enum BillingStatus {
  New = 'new',
  Validated = 'validated',
  Archived = 'archived',
}

export interface Billing {
  id: string;
  amount: number;
  isTax?: boolean;
  billingId?: string; // for tax
  validUntil?: number;
  billingPeriod?: number;
  status?: BillingStatus;
  transactionId?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface BillingSetting {
  _id: string;
  updated_at?: string;
  created_at: string;
  value: string;
  key: string;
  role: string;
  domain: string;
}

export interface CurrentBalance {
  _id: string;
  createdAt: number;
  remark: string;
  isSuccess: boolean;
  orderId: string;
  isTax: boolean;
  status: string;
  saldo: number;
  amount: number;
  name: string;
  updatedAt: string;
  __v?: number;
}
