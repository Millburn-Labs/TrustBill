export type BillCategory =
  | "airtime"
  | "data"
  | "electricity"
  | "tv"
  | "water"
  | "rent"
  | "internet"
  | "healthcare";

export type TxStatus = "confirmed" | "pending" | "failed";

export type PayStep = 1 | 2 | 3 | 4;

export interface Transaction {
  id: string;
  date: string;
  category: BillCategory;
  service: string;
  recipient: string;
  amountSTX: number;
  amountUSD: number;
  status: TxStatus;
  txHash: string;
}

export interface SavedBeneficiary {
  id: string;
  name: string;
  category: BillCategory;
  recipient: string;
  network?: string;
}

export interface BillCategoryMeta {
  id: BillCategory;
  label: string;
  description: string;
  icon: string;
  color: string;
}
