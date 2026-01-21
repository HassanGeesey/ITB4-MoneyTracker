
export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  DECLINED = 'DECLINED'
}

export type GroupName = 'A' | 'B' | 'C' | 'E' | 'F' | 'G' | 'H';

export interface Student {
  id: string;
  name: string;
  group: GroupName;
  avatar?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  group: GroupName;
  amount: number;
  date: string;
  status: PaymentStatus;
}

export interface GroupStats {
  name: GroupName;
  totalPaid: number;
  studentCount: number;
  paidCount: number;
  target: number;
}

export interface DashboardStats {
  totalCollected: number;
  targetAmount: number;
  studentsPaid: number;
  totalStudents: number;
  remainingBalance: number;
  recentTransactions: Payment[];
  groupStats: GroupStats[];
}
